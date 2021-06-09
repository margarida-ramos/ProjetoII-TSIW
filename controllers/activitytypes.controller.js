const db = require("../models/index.js");
const Activitytype = db.activitytype;

//necessary for LIKE operator
const { Op } = require('sequelize');

exports.findAll = (req, res) => {
    Activitytype.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving activitytypes."
            });
        });
};

exports.create = (req, res) => {

    Activitytype.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New Activitytype created.", location: "/activitytype/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Activitytype."
                });
        });
}

// List just one activitytype
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Activitytype.findByPk(req.params.activitytypeID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Activitytype with id ${req.params.activitytypeID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Activitytype with id ${req.params.activitytypeID}.`
            });
        });
};


// List just one activitytype
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Activitytype.destroy({
        where: {
            id: req.params.activitytypeID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted activitytype with id ${req.params.activitytypeID}.`
                });
            } else {
                res.status(404).json({
                    message: `Activitytype with id ${req.params.activitytypeID} not found.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Activitytype."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Activitytype.findByPk(req.params.activitytypeID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Activitytype with id ${req.params.activitytypeID}.`
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
                message: `Updated Activitytype with id ${req.params.activitytypeID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Activitytype with id ${req.params.activitytypeID}.`
            });
        });
};
