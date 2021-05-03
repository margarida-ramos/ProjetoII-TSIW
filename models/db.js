//const mysql = require('mysql');
//const dbConfig = require('../config/db.config.js');
const dbConfig = require('../config/db.config.js');
//export classes Sequelize and Datatypes
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST, dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max, min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire, idle: dbConfig.pool.idle
    }
});
//optional, test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};

db.sequelize = sequelize; //export the Sequelize instance (actual connection pool)

db.activity = require("./activities.model.js")(sequelize, DataTypes);

db.course = require("./courses.model.js")(sequelize, DataTypes);

db.class = require("./classes.model.js")(sequelize, DataTypes);

//optional: SYNC
module.exports = db;