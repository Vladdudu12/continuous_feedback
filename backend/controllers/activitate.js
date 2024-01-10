const ActivitateDB = require("../models").Activitate;


const controller = {
    addActivitate: async (req, res) => {
        const activitate = req.body;
        
        const activitateAdaugata = await ActivitateDB.create(activitate);

        res.status(200).send(activitateAdaugata);
    },

    getActivitateById: async (req, res) => {
        const id = req.params.id;

        const activitateCautata = await ActivitateDB.findByPk(id);

        if(activitateCautata == null) {
            res.status(404).send({message: "Not Found"});
        }

        res.status(200).send(activitateCautata);
    },

    getAllActivitati: async (req, res) => {
        const activitati = await ActivitateDB.findAll();
        if(activitati == null) {
            res.status(404).send({message: "Not Found"});
        }
        res.status(200).send(activitati);
    }
}

module.exports = controller;