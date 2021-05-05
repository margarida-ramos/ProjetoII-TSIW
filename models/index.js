const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    dialect: dbConfig.dialect
    ,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.sequelize = sequelize;

//export TUTORIAL model
db.activity = require("./activities.model.js")(sequelize, DataTypes);
db.user = require("./users.model.js")(sequelize, DataTypes);

//export TUTORIAL model
//db.course = require("./courses.model.js")(sequelize, DataTypes);

//export TUTORIAL model
//db.usertype = require("./usertypes.model.js")(sequelize, DataTypes);

//export TUTORIAL model
//db.class = require("./classes.model.js")(sequelize, DataTypes);

//export COMMENT model
//db.comment = require("./comments.model.js")(sequelize, DataTypes);

//define the 1:N relationship
//db.tutorial.hasMany(db.comment); // tutorialId is added into Comment model as FK
//db.comment.belongsTo(db.tutorial);

/* optionally: SYNC
db.sequelize.sync()
    .then(() => {
        console.log('DB is successfully synchronized')
    })
    .catch(e => {
        console.log(e)
    }); */

module.exports = db;