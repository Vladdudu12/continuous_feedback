const express = require("express");
const router = express.Router();
const controller = require('../controllers').FeedbackController;

router.route("/:id").post(controller.addFeedbackActivitate);
router.route("/:id").get(controller.getAllFeedbackByActivitateId);

module.exports = router;