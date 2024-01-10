const express = require("express");
const router = express.Router();
const controller = require('../controllers').ActivitateController;

router.route("").get(controller.getAllActivitati);
router.route("").post(controller.addActivitate);
router.route("/:id").get(controller.getActivitateById);

module.exports = router;