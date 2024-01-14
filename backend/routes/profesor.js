const express = require("express");
const router = express.Router();
const controller = require('../controllers').ProfesorController;

router.route("").get(controller.getAllProfesori);
router.route("/:id").get(controller.getProfesorById);

module.exports = router;