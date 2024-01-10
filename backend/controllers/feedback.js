const FeedbackDB = require("../models").Feedback;


const controller = {
    addFeedback: async (req, res) => {
        const feedback = req.body;
        
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

    getAllFeedback: async (req, res) => {
        const feedback = await FeedbackDB.findAll();
        if(feedback == null) {
            res.status(404).send({message: "Not Found"});
        }
        res.status(200).send(feedback);
    }
}

module.exports = controller;