const db = require("../models/index.js");
const Role = db.role;

//necessary for LIKE operator
const { Op } = require('sequelize');

exports.findAll = (req, res) => {
    Role.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
};

exports.create = (req, res) => {

    Role.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New Role created.", location: "/role/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Role."
                });
        });
}

// List just one role
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Role.findByPk(req.params.roleID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Role with id ${req.params.roleID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Role with id ${req.params.roleID}.`
            });
        });
};


// List just one role
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Role.destroy({
        where: {
            id: req.params.roleID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted role with id ${req.params.roleID}.`
                });
            } else {
                res.status(404).json({
                    message: `Role with id ${req.params.roleID} not found.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Role."
            });
        });
};
