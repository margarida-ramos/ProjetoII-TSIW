const db = require("../models/index.js");
const Submission = db.submission;

const { activity } = require("../models/index.js");
const list = require("./list");


exports.findAll = (req, res) => {
    
    list.procedure(req.query)
    let limit = list.limit;
    let offset = list.offset;

    Submission.findAndCountAll({ where: list.condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = list.getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving submissions."
            });
        });
};

exports.submit = (req, res) => {

    Submission.create(req.body)
        .then(submission => {

            User.findByPk(submission.userId)
                .then(user => {

                    Activity.findByPk(submission.activityId)
                        .then(activity => {

                            user.points += activity.points;
                            user.coins += activity.coins;
                            user.save().then(() => {

                                res.status(201).json({ message: "New Submission created.", location: "/submission/" + submission.id });
                            })

                        })
                })


        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Submission."
                });
        });
}

// List just one submission
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Submission.findByPk(req.params.submissionID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Submission with id ${req.params.submissionID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Submission with id ${req.params.submissionID}.`
            });
        });
};


// List just one submission
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Submission.destroy({
        where: {
            id: req.params.submissionID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted submission with id ${req.params.submissionID}.`
                });
            } else {
                res.status(404).json({
                    message: `Submission with id ${req.params.submissionID} not found.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Submission."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Submission.findByPk(req.params.submissionID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Submission with id ${req.params.submissionID}.`
                });
            else
                if (!req.body.Description) {
                    res.status(400).json({
                        message: `Error - Data fields are null!`
                    });
                }

            data.Description = req.body.Description;
            data.save();
            res.status(200).json({
                message: `Updated Submission with id ${req.params.submissionID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Submission with id ${req.params.submissionID}.`
            });
        });
};


/*

// List just one submission
exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Submission.update(req.body,

    {
        where: {
            id: req.params.submissionID
        }
    })
    .then(function(rowUpdated){
        if(rowUpdated === 1){
            res.status(200).json({
                message: `Updated submission with id ${req.params.submissionID}.`
            });
         }
         else
         {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Submission."
            });
         }
      }, function(err){
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Submission."
        });
      });
};

*/