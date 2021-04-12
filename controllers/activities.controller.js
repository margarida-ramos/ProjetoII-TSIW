// get resource model (definition and DB operations)
const Activity = require('../models/activities.model.js');

// EXPORT function to display list of all activities (required by ROUTER)
exports.findAll = (req, res) => {
    Activity.getAll((err, data) => {

        if (err) // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving activities."
            });
        else
            res.status(200).json(data); // send OK response with all activities data
    });
};

exports.create = (req, res) => {

    if (!req.body || !req.body.title) {
        res.status(400).json({ message: "Title can not be empy" });
        return
    }

    const activity = {
        name: req.body.name,
        description: req.body.description,
        course: req.body.course
    };

    Activity.create(activity, (err, data) => {
        if (err) // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while creating the activity."
            });
        else
            res.status(200).json(data); // send OK response with all activity data
    })
};