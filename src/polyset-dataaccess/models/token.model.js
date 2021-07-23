var mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);
 
var TokenSchema = new Schema({
  username: {
        type: String,
        required: true
    },
  token: {
        type: String,
        required: true
    },
  createdAt: {
    type:Date,
    default: Date.now,
    expires: 100,
  }
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;