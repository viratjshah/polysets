var express = require('express');
var authRouter = require('./auth.route'); 
var profileRouter = require('./profile.route');

const router = express.Router();
 
router.use('/api/auth', authRouter);
router.use('/api/auth/profile', profileRouter);
 
module.exports = router;