const StudentDB = require("../models").Student;


const controller = {
    getStudentById: async (req, res) => {
        const id = req.params.id;

        const studentCautat = await StudentDB.findByPk(id);

        if(studentCautat == null) {
            res.status(404).send({message: "Not Found"});
        } else {
            res.status(200).send(studentCautat);
          }

    },

    getAllStudents: async (req, res) => {
        const student = await StudentDB.findAll();
        if(student == null) {
            res.status(404).send({message: "Not Found"});
        }
        res.status(200).send(student);
    },

    updateStudentById: async(req, res) => {
        const id = req.params.id;

        const studentCautat = await StudentDB.findByPk(id);

        if(studentCautat == null) {
            res.status(404).send({message: "Not Found"});
        } else {
            const body = req.body;
            await studentCautat.update(body);
            await studentCautat.save();
            res.status(200).send({message: "Success!"});
        }    
    }
}

module.exports = controller;