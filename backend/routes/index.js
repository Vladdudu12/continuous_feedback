const express = require("express");
const router = express.Router();


const ActivitateRouter = require('./activitate');
const FeedbackRouter = require('./feedback');
const ProfesorRouter = require('./profesor');
const StudentRouter = require('./student');


router.use('/activitate', ActivitateRouter);
router.use('/feedback', FeedbackRouter);
router.use('/profesor', ProfesorRouter);
router.use('/student', StudentRouter);

module.exports = router;
