const express = require("express");
const router = express.Router();
const controller = require('../controllers').AuthController;

router.post('/login/:isProfessor', controller.login);
router.post('/register/:isProfessor', controller.register);
module.exports = router;