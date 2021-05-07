const db = require("../models/index.js");
const Badge = db.badge;

//necessary for LIKE operator
const { Op } = require('sequelize');

exports.findAll = (req, res) => {


    Badge.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving badges."
            });
        });
};

exports.create = (req, res) => {

    Badge.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New Badge created.", location: "/badge/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Badge."
                });
        });
}

exports.findByUser = (req, res) => {

    Badge.findAll({
        where: {
            userId: req.params.userID
        }
        }).then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving badges."
            });
        });

};

// List just one badge
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Badge.findByPk(req.params.badgeID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Badge with id ${req.params.badgeID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Badge with id ${req.params.badgeID}.`
            });
        });
};


// List just one badge
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Badge.destroy({
        where: {
            id: req.params.badgeID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted badge with id ${req.params.badgeID}.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Badge."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Badge.findByPk(req.params.badgeID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Badge with id ${req.params.badgeID}.`
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
                message: `Updated Badge with id ${req.params.badgeID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Badge with id ${req.params.badgeID}.`
            });
        });
};
