const ProfesorDB = require("../models").Profesor;


const controller = {
    addProfesor: async (req, res) => {
        const profesor = req.body;
        
        const profesorAdaugat = await ProfesorDB.create(profesor);

        res.status(200).send(profesorAdaugat);
    },

    getProfesorById: async (req, res) => {
        const id = req.params.id;

        const profesorCautat = await ProfesorDB.findByPk(id);

        if(profesorCautat == null) {
            res.status(404).send({message: "Not Found"});
        }

        res.status(200).send(profesorCautat);
    },

    getAllProfesori: async (req, res) => {
        const profesor = await ProfesorDB.findAll();
        if(profesor == null) {
            res.status(404).send({message: "Not Found"});
        }
        res.status(200).send(profesor);
    }
}

module.exports = controller;