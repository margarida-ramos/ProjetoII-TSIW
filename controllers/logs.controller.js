const db = require("../models/index.js");
const Log = db.log;
const list = require("./list");

exports.findAll = (req, res) => {
    
    list.procedure(req.query)
    let limit = list.limit;
    let offset = list.offset;

    Log.findAndCountAll({ where: list.condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = list.getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving logs."
            });
        });
};

exports.create = (req, res) => {

    Log.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New Log created.", location: "/log/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Log."
                });
        });
}

// List just one log
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Log.findByPk(req.params.logID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Log with id ${req.params.logID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Log with id ${req.params.logID}.`
            });
        });
};


// List just one log
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Log.destroy({
        where: {
            id: req.params.logID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted log with id ${req.params.logID}.`
                });
            } else {
                res.status(404).json({
                    message: `Log with id ${req.params.logID} not found.`
                });
            }

        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Log."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Log.findByPk(req.params.logID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Log with id ${req.params.logID}.`
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
                message: `Updated Log with id ${req.params.logID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Log with id ${req.params.logID}.`
            });
        });
};


/*

// List just one log
exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Log.update(req.body,

    {
        where: {
            id: req.params.logID
        }
    })
    .then(function(rowUpdated){
        if(rowUpdated === 1){
            res.status(200).json({
                message: `Updated log with id ${req.params.logID}.`
            });
         }
         else
         {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Log."
            });
         }
      }, function(err){
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Log."
        });
      });
};

*/