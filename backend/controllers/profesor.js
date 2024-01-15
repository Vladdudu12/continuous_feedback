const ProfesorDB = require("../models").Profesor;


const controller = {
    getProfesorById: async (req, res) => {
        const id = req.params.id;

        const profesorCautat = await ProfesorDB.findByPk(id);

        if(profesorCautat == null) {
            res.status(404).send({message: "Not Found"});
        } else {
            res.status(200).send(profesorCautat);
        }
    },

    getAllProfesori: async (req, res) => {
        const profesor = await ProfesorDB.findAll();
        if(profesor == null) {
            res.status(404).send({message: "Not Found"});
        }
        res.status(200).send(profesor);
    },

    updateProfesorById: async(req, res) => {
        const id = req.params.id;

        const profesorCautat = await ProfesorDB.findByPk(id);

        if(profesorCautat == null) {
            res.status(404).send({message: "Not Found"});
        } else {
            const body = req.body;
            console.log(body);
            const profesorModificat = await ProfesorDB.update({nume: body.nume, materie: body.materie}, {
                where: {
                    id: id,
                }
            });
            if(profesorModificat == null) {
                res.status(500).send({message: "Server error!"});
            } else {
                res.status(200).send({message: "Success!"});
            }
        }    
    }

}

module.exports = controller;