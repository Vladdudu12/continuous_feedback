const express = require("express");
const router = express.Router();
const controller = require('../controllers').StudentController;

router.route("").get(controller.getAllStudents);
router.route("/:id").get(controller.getStudentById);
router.route("/:id").put(controller.updateStudentById);

module.exports = router;