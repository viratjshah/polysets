var express = require('express');
var authRouter = require('./auth.route'); 
var profileRouter = require('./profile.route');
var customizeRouter = require('./customize.route');


const router = express.Router();
 
router.use('/api/auth', authRouter);
router.use('/api/auth/profile', profileRouter);
router.use('/api/auth/customize', customizeRouter);


 
module.exports = router;