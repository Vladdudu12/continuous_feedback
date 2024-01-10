const express = require("express");
const router = express.Router();
const controller = require('../controllers').StudentController;

router.route("").get(controller.getAllStudents);
router.route("").post(controller.addStudent);
router.route("/:id").get(controller.getStudentById);

module.exports = router;