const db = require("../models/index.js");
const Activity = db.activity;
const Notification = db.notification;
const User = db.user;
const Class = db.class;
const Course = db.course;
const list = require("./list");

exports.findAll = (req, res) => {
    
    list.procedure(req.query)
    let limit = list.limit;
    let offset = list.offset;

    Activity.findAndCountAll({ where: list.condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = list.getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving activities."
            });
        });
};

exports.findByUser = (req, res) => {

    User.findByPk(req.params.userID)
        .then(user => {
            if (user === null)
                res.status(404).json({
                    message: `Not found User with id ${req.params.badgeID}.`
                });
            else
            {
                res.status(200).json(user.getClasses());
                user.getClasses();

                let classes = [];
                for (i = 0; i < user.classes.length; i++)
                {
                    classes.push(user.classes.id)
                }

                Activity.findAll({
                    where: {
                        classId:
                        {
                            [Op.or]: classes
                        }
                        
                    }
                }).then(activities => {
                    res.status(200).json(activities);
                })

            }
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving User with id ${req.params.badgeID}.`
            });
        });
};

exports.create = (req, res) => {

    Activity.create(req.body)
        .then(data => {

            // Create Notification
            /*
            User.findAll({
                where:{
                    
                }
            }).then(users => {

            })
            */


            res.status(201).json({ message: "New Activity created.", location: "/activity/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Activity."
                });
        });
}

// List just one activity
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Activity.findByPk(req.params.activityID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Activity with id ${req.params.activityID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Activity with id ${req.params.activityID}.`
            });
        });
};


// List just one activity
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Activity.destroy({
        where: {
            id: req.params.activityID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted activity with id ${req.params.activityID}.`
                });
            } else {
                res.status(404).json({
                    message: `Activity with id ${req.params.activityID} not found.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Activity."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Activity.findByPk(req.params.activityID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Activity with id ${req.params.activityID}.`
                });
            else
                if (!req.body.Title || !req.body.Level) {
                    res.status(400).json({
                        message: `Error - Data fields are null!`
                    });
                }

            data.Title = req.body.Title;
            data.Level = req.body.Level;
            data.Coins = req.body.Coins;
            data.Points = req.body.Points;
            data.activitytypeId = req.body.activitytypeId;
            data.courseId = req.body.courseId;
            data.classId = req.body.classId;
            data.save();
            res.status(200).json({
                message: `Updated Activity with id ${req.params.activityID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Activity with id ${req.params.activityID}.`
            });
        });
};

