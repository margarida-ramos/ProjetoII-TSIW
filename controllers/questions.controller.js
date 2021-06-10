const db = require("../models/index.js");
const Question = db.question;

//necessary for LIKE operator
const { Op } = require('sequelize');
const list = require("./list");

exports.findAll = (req, res) => {
    
    list.procedure(req.query)
    let limit = list.limit;
    let offset = list.offset;

    Question.findAndCountAll({ where: list.condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = list.getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving questions."
            });
        });
};

exports.create = (req, res) => {

    Question.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New Question created.", location: "/question/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Question."
                });
        });
}

// List just one question
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Question.findByPk(req.params.questionID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Question with id ${req.params.questionID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Question with id ${req.params.questionID}.`
            });
        });
};


// List just one question
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Question.destroy({
        where: {
            id: req.params.questionID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted question with id ${req.params.questionID}.`
                });
            } else {
                res.status(404).json({
                    message: `Question with id ${req.params.questionID} not found.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Question."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Question.findByPk(req.params.questionID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Question with id ${req.params.questionID}.`
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
                message: `Updated Question with id ${req.params.questionID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Question with id ${req.params.questionID}.`
            });
        });
};
