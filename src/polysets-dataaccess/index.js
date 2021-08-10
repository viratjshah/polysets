var dotenv = require('dotenv')
dotenv.config();

const structuredLog = require('structured-log');
const log = structuredLog.configure()
  .writeTo(new structuredLog.ConsoleSink())
  .create();

var db = require('./config/db');

//mongoose setup
var  mongoose = require('mongoose');
log.info('connecting to mongodb');
log.info(db.url);
mongoose.Promise = Promise;
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
  log.error('unable to connect to mongodb')
  throw new Error('unable to connect to mongodb');
});

var PassportManager = require('./config/passport');

var user = require("./models/user.model");
var profile = require("./models/profile.model");
var token = require("./models/token.model")
var customize = require("./models/customize.model");

module.exports = {
  Mongoose: mongoose,
  PassportManager: PassportManager,
  User: user,
  Profile: profile,
  Token: token,
  Customize:customize
}