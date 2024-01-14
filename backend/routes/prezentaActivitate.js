const express = require("express");
const router = express.Router();
const controller = require('../controllers').PrezentaActivitateController;

router.route("/:id").get(controller.getAllActivitatiByStudentId);
router.route("/stud/:id").get(controller.getAllStudentsByActivitateId);
router.route("/").post(controller.addActivitateStudent);
module.exports = router;