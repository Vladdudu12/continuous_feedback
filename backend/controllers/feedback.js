const FeedbackDB = require("../models").Feedback;


const controller = {
    addFeedbackActivitate: async (req, res) => {
        const id = req.params.id;
        const feedback = {
            ActivitateId: id,
        };
        const emoji = req.body.descriere;
        if(emoji == '😊') {
            feedback.descriere = 'Smiley'
        }
        if(emoji == '🙁') {
            feedback.descriere = "Frowny"
        }
        if(emoji == '😮') {
            feedback.descriere = 'Surprised'
        }
        if(emoji == '😵') {
            feedback.descriere = "Confused"
        }
        
        const feedbackAdaugat = await FeedbackDB.create(feedback);

        res.status(200).send(feedbackAdaugat);
    },

    getFeedbackById: async (req, res) => {
        const id = req.params.id;

        const feedbackCautat = await FeedbackDB.findByPk(id);

        if(feedbackCautat == null) {
            res.status(404).send({message: "Not Found"});
        }

        res.status(200).send(feedbackCautat);
    },

    getAllFeedbackByActivitateId: async (req, res) => {
        const id = req.params.id;
        const feedback = await FeedbackDB.findAll({
            where: {
                ActivitateId: id,
            }
        });
        if(feedback == null) {
            res.status(404).send({message: "Not Found"});
        }
        res.status(200).send(feedback);
    }
}

module.exports = controller;