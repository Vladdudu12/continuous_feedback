const express = require("express");
const router = express.Router();
const connection = require("../models").connection;

const ActivitateRouter = require('./activitate');
const FeedbackRouter = require('./feedback');
const ProfesorRouter = require('./profesor');
const StudentRouter = require('./student');
const AuthRouter = require('./auth');
const PrezentaActivitateRouter = require('./prezentaActivitate');

const {verifyToken} = require('../utils/middleware');

router.use('/auth', AuthRouter);
router.use('/activitate', verifyToken, ActivitateRouter);
router.use('/feedback', verifyToken, FeedbackRouter);
router.use('/profesor', verifyToken, ProfesorRouter);
router.use('/student', verifyToken, StudentRouter);
router.use('/prezentaActivitate', verifyToken, PrezentaActivitateRouter);
router.get("/reset", (req, res) => {
    connection
      .sync({ force: true })
      .then(() => {
        res.status(201).send({ message: "Database reset" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Database reset failed",
          err: err.message,
        });
      });
  });
  
module.exports = router;
