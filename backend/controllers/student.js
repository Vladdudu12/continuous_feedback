const StudentDB = require("../models").Student;


const controller = {
    addStudent: async (req, res) => {
        const student = req.body;
        
        const studentAdaugat = await StudentDB.create(student);

        res.status(200).send(studentAdaugat);
    },

    getStudentById: async (req, res) => {
        const id = req.params.id;

        const studentCautat = await StudentDB.findByPk(id);

        if(studentCautat == null) {
            res.status(404).send({message: "Not Found"});
        }

        res.status(200).send(studentCautat);
    },

    getAllStudents: async (req, res) => {
        const student = await StudentDB.findAll();
        if(student == null) {
            res.status(404).send({message: "Not Found"});
        }
        res.status(200).send(student);
    }
}

module.exports = controller;