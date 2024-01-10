const express = require("express");
const router = express.Router();
const controller = require('../controllers').FeedbackController;

router.route("").get(controller.getAllFeedback);
router.route("").post(controller.addFeedback);
router.route("/:id").get(controller.getFeedbackById);

module.exports = router;