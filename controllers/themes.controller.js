const db = require("../models/index.js");
const Theme = db.theme;

const { Op } = require('sequelize');

exports.findAll = (req, res) => {


    Theme.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving themes."
            });
        });
};

exports.create = (req, res) => {

    Theme.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New Theme created.", location: "/theme/" + data.id });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Theme."
                });
        });
}

// Display list of all users for a given theme (with theme info)
exports.getUsers = (req, res) => {
    // console.log(req.params.themeID)
    Theme.findByPk(req.params.themeID,
        {
            include: {
                model: User,
                through: { attributes: [] } //remove data retrieved from join table
            }
        })
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Theme with id ${req.params.themeID}.`
                });
            else
                res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Users for Theme with id ${req.params.themeID}.`
            });
        });
};


// Add one theme to one user
exports.assignTheme = (req, res) => {
    User.findByPk(req.params.userID)
        .then(user => {
            // no data returned means there is no user in DB with that given ID 
            if (user === null)
                res.status(404).json({
                    message: `Not found User with id ${req.params.userID}.`
                });
            else {
                Theme.findByPk(req.params.themeID)
                    .then(theme => {
                        if (theme === null)
                            res.status(404).json({
                                message: `Not found Theme with id ${req.params.themeID}.`
                            });
                        else {
                            theme.addUser(user)
                                .then(data => {
                                    if (data === undefined)
                                        res.status(200).json({
                                            message: `Theme ${req.params.themeID} was already assigned to User ${req.params.userID}.`
                                        });
                                    else
                                        res.status(200).json({
                                            message: `Added Theme ${req.params.themeID} to User ${req.params.userID}.`
                                        });
                                })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Error adding Theme ${req.params.themeID} to User ${req.params.userID}.`
            });
        });
};

// Remove one theme from one user
exports.unassignTheme = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.userID)

        // no data returned means there is no user in DB with that given ID 
        if (user === null) {
            res.status(404).json({
                message: `Not found User with id ${req.params.userID}.`
            });
            return;
        }

        let theme = await Theme.findByPk(req.params.themeID)

        // no data returned means there is no theme in DB with that given ID 
        if (theme === null) {
            res.status(404).json({
                message: `Not found Theme with id ${req.params.themeID}.`
            });
            return;
        }

        let data = await theme.removeUser(user)

        // console.log(data);
        if (data === 1)
            res.status(200).json({
                message: `Removed Theme ${req.params.themeID} to User ${req.params.userID}.`
            });
        else
            res.status(200).json({
                message: `No Theme ${req.params.themeID} associated to User ${req.params.userID}.`
            });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || `Error adding Theme ${req.params.themeID} to User ${req.params.userID}.`
        })
    };
};

exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Theme.findByPk(req.params.themeID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Theme with id ${req.params.themeID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Theme with id ${req.params.themeID}.`
            });
        });
};


exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Theme.destroy({
        where: {
            id: req.params.themeID
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({
                    message: `Deleted theme with id ${req.params.themeID}.`
                });
            } else {
                res.status(404).json({
                    message: `Theme with id ${req.params.themeID} not found.`
                });
            }
        }, function (err) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Theme."
            });
        });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Theme.findByPk(req.params.themeID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Theme with id ${req.params.themeID}.`
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
                message: `Updated Theme with id ${req.params.themeID}.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Theme with id ${req.params.themeID}.`
            });
        });
};
