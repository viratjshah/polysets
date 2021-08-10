var auth = require("../controllers/auth.controller");
var express = require('express');
const router = express.Router();
 
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/resetrequest', auth.resetRequest);
router.post('/reset/:token', auth.verifyToken);
// router.post('/reset/:token', auth.reset);
router.post('/token', auth.token);
router.post('/testrequest', auth.testRequest);
router.post('/testreset/:token', auth.testReset);



router.get('/test/:name', auth.test);

module.exports = router;