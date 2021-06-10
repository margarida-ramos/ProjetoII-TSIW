const db = require("../models/index.js");
const History = db.history;
const list = require("./list");

exports.findAll = (req, res) => {
    
    list.procedure(req.query)
    let limit = list.limit;
    let offset = list.offset;

    History.findAndCountAll({ where: list.condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = list.getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving histories."
            });
        });
};

exports.create = (req, res) => {

    History.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New History created.", location: "/history/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the History."
                });
        });
}

// List just one history
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    History.findByPk(req.params.historyID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found History with id ${req.params.historyID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving History with id ${req.params.historyID}.`
            });
        });
};


// List just one history
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    History.destroy({
        where: {
            id: req.params.historyID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted history with id ${req.params.historyID}.`
                });
            } else {
                res.status(404).json({
                    message: `History with id ${req.params.historyID} not found.`
                });
            }

        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the History."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    History.findByPk(req.params.historyID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found History with id ${req.params.historyID}.`
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
                message: `Updated History with id ${req.params.historyID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving History with id ${req.params.historyID}.`
            });
        });
};


/*

// List just one history
exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    History.update(req.body,

    {
        where: {
            id: req.params.historyID
        }
    })
    .then(function(rowUpdated){
        if(rowUpdated === 1){
            res.status(200).json({
                message: `Updated history with id ${req.params.historyID}.`
            });
         }
         else
         {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the History."
            });
         }
      }, function(err){
        res.status(500).json({
            message: err.message || "Some error occurred while creating the History."
        });
      });
};

*/