var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var User = require('../models/user.model');
var config = require('../config/db'); 
 
var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey : process.env.TOKEN_SECRET
};

class passportManager {
    initialize = function(){
        var opts = {
            jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey : process.env.TOKEN_SECRET
        }
        passport.use(new Strategy(opts, function(jwt_payload, done) {
            User.findOne({id: jwt_payload.id}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));
        return passport.initialize();
    }
    authenticate = function(req, res, next){
        passport.authenticate('jwt', { session: false}, (err, user, info) => {
          if (err) { return next(err); }
          if (!user) {
              if (info.name === "TokenExpiredError") {
                  return res.status(401).json({ message: "token has expired." });
              } else {
                  return res.status(401).json({ message: info.message });
              }
          }
          req.user = user;
          return next();
        })(req, res, next);
      };
 
}

PassportManager = new passportManager(); 
module.exports = PassportManager