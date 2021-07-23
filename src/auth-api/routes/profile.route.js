var profileController = require("../controllers/profile.controller");

var express = require('express');
const router = express.Router();
 
router.route('/')
    .get(PassportManager.authenticate, profileController.get)
    .post(PassportManager.authenticate, profileController.update);

module.exports = router;