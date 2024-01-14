const ActivitateDB = require("../models").Activitate;
const FeedbackDB = require('../models').Feedback;

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

    getAllActivitatiByProfessorId: async (req, res) => {
        const id = req.params.id;
        const activitati = await ActivitateDB.findAll({
            where: {
                ProfesorId: id,
            }, 
        });

        const feedbackList = [];
        for(let i = 0; i < activitati.length; i++) {
            const feedback = await FeedbackDB.findAll({
                where: {
                    ActivitateId: activitati[i].id,
                }
            });
            feedbackList.push(feedback);
        }
        

        if(activitati == null) {
            res.status(404).send({message: "Not Found"});
        }

        res.status(200).send({activitati: activitati, feedback: feedbackList});
    }
}

module.exports = controller;