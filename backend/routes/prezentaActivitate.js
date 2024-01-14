const express = require("express");
const router = express.Router();
const controller = require('../controllers').PrezentaActivitateController;

router.route("/:id").get(controller.getAllActivitatiByStudentId);
router.route("/").post(controller.addActivitateStudent);
module.exports = router;