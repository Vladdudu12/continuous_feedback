const PrezentaActivitateDB = require("../models").PrezentaActivitate;
const StudentDB = require("../models").Student;
const ActivitateDB = require("../models").Activitate;
const ActivitateModel = require("../models/activitate");
const ProfesorDB = require("../models").Profesor;
const controller = {
  addActivitateStudent: async (req, res) => {
    const activitateStudent = {
      codAcces: req.body.codAcces,
      StudentId: req.body.StudentId,
    };

    const activitate = await ActivitateDB.findOne({
      where: {
        codAcces: activitateStudent.codAcces,
      },
    });

    if (activitate == null) {
      res
        .status(404)
        .send({ message: "Nu exista Activitatea pentru codul introdus" });
    }

    const prezentaAdaugata = await PrezentaActivitateDB.create({
      StudentId: activitateStudent.StudentId,
      ActivitateId: activitate.id,
    });

    res.status(200).send(prezentaAdaugata);
  },

  getAllActivitatiByStudentId: async (req, res) => {
    const id = req.params.id;
    const student = await StudentDB.findOne({
      where: {
        id: id,
      },
    });

    if (student == null) {
      res.status(404).send({ message: "Student Inexistent" });
    }
    const prezente = await PrezentaActivitateDB.findAll({
      where: {
        StudentId: student.id,
      },
    });

    let activitati = [];
    for (let i = 0; i < prezente.length; i++) {
      const activitate = await ActivitateDB.findOne({
        where: {
          id: prezente[i].ActivitateId,
        }, include: ProfesorDB
      });
      if (activitate !== null) {
        activitati.push(activitate);
      }
    }

    res.status(200).send(activitati);
  },
  getAllStudentsByActivitateId: async (req, res) => {
    const id = req.params.id;
    const activitate = await ActivitateDB.findOne({
      where: {
        id: id,
      },
    });

    if (activitate == null) {
      res.status(404).send({ message: "Activitate Inexistenta" });
    }
    const prezente = await PrezentaActivitateDB.findAll({
      where: {
        ActivitateId: activitate.id,
      },
    });

    let studenti = [];
    for (let i = 0; i < prezente.length; i++) {
      const student = await StudentDB.findOne({
        where: {
          id: prezente[i].StudentId,
        },
      });
      if (student !== null) {
        studenti.push(student);
      }
    }

    res.status(200).send(studenti);
  }
};

module.exports = controller;
