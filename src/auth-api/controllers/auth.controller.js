var dataAccess = require('@pridevel/dataaccess');
var User = dataAccess.User;
var Token = dataAccess.Token;
const jwt = require('jsonwebtoken');
const { json } = require('express');
var crypto = require('crypto');
var email = require('../utils/emailClient')

class Auth {
  test = async function (req, res) {
    var user = await User.findOne({ username: req.params.name });
    console.log(user);
    var input = req.params.name;
    var token = crypto.randomBytes(8).toString('hex');
    var time = Date.now() / 1000 + 86400;
    return res.json({ msg: input, token: token, time: time });
  };

  testRequest = async function(req,res) {
    if(!req.body.username || req.body.username===''){
      return res.json({success:false, msg:'Invalid username'})
    } else {
      try{
        var user = await User.findOne({username:req.body.username});
        if(!user){
          return res.json({success:false, msg:'User not found'})
        }
        var resetEmailToken = crypto.randomBytes(16).toString('hex',15);
        var token = new Token({username:req.body.username, token:resetEmailToken})
        token.save(async (err)=>{
          if(err){
            return res.json({success:false, msg:'Error generating token, please try again'})
          }
          let result = await email.resetPassword(req.body.username,'Aniket Bhat', `http://polysets.local/auth/reset/${resetEmailToken}`)
          //   .then(r=>{
          //     console.log('res',r.json())
          //     return res.json({msg:'bhsfjg'})
          // }).catch(err=>{
          //   console.log(err)
          //   return res.json({msg:'suufhng'})
          // })
          if(result && result.success){
            console.log('succes res',result)
            return res.json({...result, msg:'Mail sent successfully'})
          }else if (result && !result.success){
            console.log('Fail res',result)
            return res.json({...result, msg:'Error sending email'})
          } else {
            console.log('idfk',result)
            return res.json({success:false, msg:'Internal server error email'})
          }
        })
      } catch(err) {
        console.log('testReqest error',err);
        return res.json({success:false, msg:'Internal server error', error:err})
      }
    }
  }

  testReset = async function (req,res) {
    if (!req.params.token || req.params.token==='') {
      return res.json({ success: false, msg: 'Invalid Token' });
    } else {
      try{
        var token = await Token.findOne({token:req.params.token})
        if (!token){
          return res.json({ success: false, msg: 'Invalid Token' });
        }
          console.log('token and password', token, req.body.password);
          console.log('password', req.body.password);

          var user = await User.findOne({username:token.username})
          user.password = req.body.password;
          user.save((err)=>{
            if(err){
              return res.json({success:false, msg:'Error resetting password', error:err})
            }
            res.cookie('access-token', '', { maxAge: 1, httpOnly: true });
            return res.json({success:true, msg:'Password has been reset, please log in again'})
          })
      } catch(err) {
        console.log('errror', err);
        return res.json({success:false, msg:'Internal server error', error:err})
      }
    }
  }

  register = function (req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'missing username and password.' });
    } else {
      var user = new User({
        username: req.body.username,
        password: req.body.password
      });
      user.save((err) => {
        if (err) {
          return res.json({
            success: false,
            msg: 'username already exists.',
            error: err
          });
        }
        
        res.json({ success: true, msg: 'user is created' });
      });
    }
  };

  login = function (req, res) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: 'User not found' });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          if (user.is_email_valid) {
            var token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {
              expiresIn: '30d',
            });
            // res.cookie('access-token', token, {
            //   maxAge: 60 * 60 * 24 * 30 * 1000,
            //   httpOnly: true,
            // });
            return res
              .status(200)
              .json({ success: true, msg: 'login successful', token:JSON.stringify(token) });
          } else {
            var token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {
              expiresIn: '1d',
            });
            // res.cookie('access-token', token, {
            //   maxAge: 60 * 60 * 24 * 1000,
            //   httpOnly: true,
            // });
            return res
              .status(200)
              .json({ success: true, msg: 'email verification pending', token:JSON.stringify(token) });
          }
        } else {
          return res.send({ success: false, msg: 'incorrect password' });
        }
      });
    });
  };

  logout = function (req, res) {
    res.cookie('access-token', '', { maxAge: 1, httpOnly: true });
    return res.status(200).json({ success: true, message: 'User logged out!' });
  };

  resetRequest = async function (req, res) {
    if(!req.body.username || req.body.username===''){
      return res.json({success:false, msg:'Invalid username'})
    } else {
      try{
        var user = await User.findOne({username:req.body.username});
        if(!user){
          return res.json({success:false, msg:'User not found'})
        }
        console.log(user)
        var resetEmailToken = crypto.randomBytes(16).toString('hex',15);
        var resetEmailTime = (Date.now() / 1000) + 86400;
        user.reset_email_time = resetEmailTime;
        user.reset_email_token = resetEmailToken;
        user.save((err)=>{
          if(err){
            return res.json({success:false, msg:'Error generating token'})
          }
          return res.json({success:true, msg:`http://p1app.local/auth/reset/${resetEmailToken}`})
        })
      } catch(err) {
        return res.json({success:false, msg:'Internal server error', error:err})
      }
    
      // User.findOne({ username: req.body.username }, (err, user) => {
      //   if (err) {
      //     return res.json({
      //       success: false,
      //       msg: 'Error on the backend',
      //       error: err,
      //     });
      //   } else {
      //     if (!user) {
      //       return res.json({ success: false, msg: 'User not found' });
      //     }
      //     var resetEmailToken = crypto.randomBytes(16).toString('hex', 15);
      //     var resetEmailTime = Date.now() / 1000 + 86400;
      //     // user.reset_email_token = resetEmailToken;
      //     // user.reset_email_time = resetEmailTime;
      //     console.log(user);
      //     User.findOneAndUpdate(
      //       { username: user.username },
      //       { reset_email_token: resetEmailToken, reset_email_time: resetEmailTime },
      //       { new: true },
      //       (err, updatedUser) => {
      //         if (err) {
      //           return res.json({
      //             success: true,
      //             msg: 'Error generating reset token',
      //             error: err,
      //           });
      //         } else {
      //           if (!updatedUser) {
      //             return res.json({
      //               success: true,
      //               msg: 'Could not generate reset token',
      //               error: err,
      //             });
      //           }
      //           return res.json({
      //             success: true,
      //             msg: `Reset token generated. https://p1app.local/auth/reset/${updatedUser.reset_email_token}`,
      //           });
      //         }
      //       }
      //     );
      //   }
      // });
    }
  };

  verifyToken = async function (req, res) {
    if (!req.params.token || req.params.token==='') {
      return res.json({ success: false, msg: 'Invalid Token' });
    } else {
      try{
        console.log('1')
        var user = await User.findOne({reset_email_token:req.params.token})
        console.log('2')
        if (!user){
          console.log('3')
          return res.json({ success: false, msg: 'Invalid Token' });
        }
        if(user.reset_email_time===0 || user.reset_email_time < (Date.now()/1000)){
          console.log('4')
          return res.json({ success: false, msg: 'Token Expired' });
        } else {
          console.log('vUser', user);
          user.reset_email_time=0;
          user.reset_email_token='';
          user.password = req.body.password;
          user.save((err)=>{
            if(err){
              return res.json({success:false, msg:'Error resetting password', error:err})
            }
            res.cookie('access-token', '', { maxAge: 1, httpOnly: true });
            return res.json({success:true, msg:'Password has been reset, please log in again'})
          })
        }
      } catch(err) {
        console.log('errror', err);
        return res.json({success:false, msg:'Internal server error', error:err})
      }
      // User.findOne({ reset_email_token: req.params.token }, (err, user) => {
      //   if (err) {
      //     return res.json({ success: false, msg: 'Error verifying token', error: err });
      //   } else {
      //     if (!user) {
      //       return res.json({ success: false, msg: 'Invalid Token' });
      //     }
      //     if (!user.reset_email_time ||user.reset_email_time < Date.now() / 1000) {
      //       return res.json({ success: false, msg: 'Token Expired' });
      //     } else {
      //       User.findOneAndUpdate(
      //         { username: user.username },
      //         {
      //           $set: { password: req.body.password, reset_email_token:undefined, reset_email_time:null },
      //         },
      //         { useFindAndModify: false, new: true, omitUndefined: true},
      //         (err, updatedUser) => {
      //           if (err) {
      //             return res.json({
      //               success: false,
      //               msg: 'Error updating password',
      //               error: err,
      //             });
      //           } else {
      //             if (!user) {
      //               return res.json({
      //                 success: false,
      //                 msg: 'Invalid Token and username',
      //               });
      //             }
      //             console.log(updatedUser);
      //             res.cookie('access-token', '', { maxAge: 1, httpOnly: true });
      //             return res.json({
      //               success: true,
      //               msg: 'Password changed, please log in again',
      //             });
      //           }
      //         }
      //       );
      //     }
      //   }
      // });
    }
  };

  reset = async function (req, res) {
    try {
      var user = await User.findOne({ reset_email_token: req.params.token });
      console.log(user, req.params.token);
      user.password = req.body.password;
      user.reset_email_token = null;
      user.reset_email_time = null;
    } catch (err) {
      return res.json({
        success: false,
        msg: 'Error on the backend',
        error: err,
      });
    }
    User.findOneAndUpdate({ username: user.username }, { $set: user })
      .then((r) => {
        res.cookie('access-token', '', { maxAge: 1, httpOnly: true });
        return res.json({
          success: true,
          msg: 'Password has been changed, please log in again',
        });
      })
      .catch((err) => {
        return res.json({ success: false, msg: 'Error on the backend' });
      });
  };

  resendVerifyEmail = function (req, res) {
    User.findOne({username:req.body.username}, (err, user)=>{
      if (err) throw err;
      if(!user){
        return res.json({success:false, msg:'User not found'})
      }else {
        

      }
    })

    var token = crypto.randomBytes(8).toString('hex');
    var time = Math.floor(Date.now() / 1000 + 86400);
    return [null, token, time];
  };

  token = function (req, res) {
    User.findOne(
      {
        username: req.body.username,
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          res.status(401).send({ success: false, msg: 'user not found.' });
        } else {
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              var token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {
                expiresIn: '30m',
              });
              res.json({ success: true, token: 'JWT ' + token });
            } else {
              res
                .status(401)
                .send({ success: false, msg: 'incorrect password' });
            }
          });
        }
      }
    );
  };
}

Auth = new Auth();
module.exports = Auth;
