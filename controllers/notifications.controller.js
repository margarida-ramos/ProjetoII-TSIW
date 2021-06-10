const db = require("../models/index.js");
const Notification = db.notification;

exports.findAll = (req, res) => {
    
    list.procedure(req.query)
    let limit = list.limit;
    let offset = list.offset;

    Notification.findAndCountAll({ where: list.condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = list.getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving notifications."
            });
        });
};

exports.create = (req, res) => {

    Notification.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New Notification created.", location: "/notification/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Notification."
                });
        });
}

// List just one notification
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Notification.findByPk(req.params.notificationID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Notification with id ${req.params.notificationID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Notification with id ${req.params.notificationID}.`
            });
        });
};


// List just one notification
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Notification.destroy({
        where: {
            id: req.params.notificationID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted notification with id ${req.params.notificationID}.`
                });
            } else {
                res.status(404).json({
                    message: `Notification with id ${req.params.notificationID} not found.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Notification."
            });
        });
};

exports.read = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Notification.findByPk(req.params.notificationID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Notification with id ${req.params.notificationID}.`
                });
            else
                if (!req.body.Description) {
                    res.status(400).json({
                        message: `Error - Data fields are null!`
                    });
                }

            data.Read = true;
            data.save();
            res.status(200).json({
                message: `Read Notification ${req.params.notificationID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Notification with id ${req.params.notificationID}.`
            });
        });
};


/*

// List just one notification
exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Notification.update(req.body,

    {
        where: {
            id: req.params.notificationID
        }
    })
    .then(function(rowUpdated){
        if(rowUpdated === 1){
            res.status(200).json({
                message: `Updated notification with id ${req.params.notificationID}.`
            });
         }
         else
         {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Notification."
            });
         }
      }, function(err){
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Notification."
        });
      });
};

*/