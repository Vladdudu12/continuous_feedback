const express = require("express");
const router = express.Router();
const controller = require('../controllers').ActivitateController;

router.route("/all/:id").get(controller.getAllActivitatiByProfessorId);
router.route("").post(controller.addActivitate);
router.route("/:id").get(controller.getActivitateById);

module.exports = router;