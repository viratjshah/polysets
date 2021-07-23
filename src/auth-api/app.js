var dotenv = require('dotenv')
dotenv.config();

const structuredLog = require('structured-log');
const log = structuredLog.configure()
  .writeTo(new structuredLog.ConsoleSink())
  .create();

log.info('starting web host')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//p1app dataaccess
var dataAccess = require('@p1app/dataaccess')
var mongoose = dataAccess.Mongoose;
var db = dataAccess.db;
var PassportManager = dataAccess.PassportManager;

var router = require('./routes');
var corsMiddleware = require('./config/cors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.options('*', corsMiddleware);
app.use(corsMiddleware)
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/',router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(PassportManager.initialize());

module.exports = app;
