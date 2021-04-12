const sql = require("./db.js"); // get DB connection

// define ACTIVITY model constructor
const Activity = function (activity) {
    this.name = activity.name;
    this.description = activity.description;
    this.course = activity.course;
};

// define method getAll to handle getting all Activities from DB
// result = "(error, data)", meaning it will return either an error message or some sort of data
Activity.getAll = (result) => {
    sql.query("SELECT * FROM activities", (err, res) => {

        if (err) {

            result(err, null);
            return;
        }

        result(null, res); // the result will be sent to the CONTROLLER
    });
};

// EXPORT MODEL (required by CONTROLLER)
module.exports = Activity;