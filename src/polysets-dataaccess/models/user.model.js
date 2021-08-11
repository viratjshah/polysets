var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);
 
var UserSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_email_valid:{
    type:Boolean,
    default:false
  }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.pre('findOneAndUpdate', function (next) {
    var user = this;
    if (this.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;