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
db.course = require("./courses.model.js")(sequelize, DataTypes);

//export TUTORIAL model
db.usertype = require("./usertypes.model.js")(sequelize, DataTypes);

//export TUTORIAL model
db.class = require("./classes.model.js")(sequelize, DataTypes);

//export TUTORIAL model
db.history = require("./histories.model.js")(sequelize, DataTypes);

//export TUTORIAL model
db.badge = require("./badges.model.js")(sequelize, DataTypes);

//export TUTORIAL model
db.notification = require("./notifications.model.js")(sequelize, DataTypes);

//export TUTORIAL model
db.submission = require("./submissions.model.js")(sequelize, DataTypes);

//export TUTORIAL model
db.question = require("./questions.model.js")(sequelize, DataTypes);



//define 1:N relationships
db.course.hasMany(db.activity);
db.activity.belongsTo(db.course);

db.class.hasMany(db.activity); 
db.activity.belongsTo(db.class);

db.user.hasMany(db.history);
db.history.belongsTo(db.user); 

db.history.belongsTo(db.activity); 
db.activity.hasMany(db.history);

db.user.hasMany(db.notification);
db.notification.belongsTo(db.user);

db.activity.hasMany(db.question);
db.question.belongsTo(db.activity);

db.submission.hasMany(db.question);
db.question.belongsTo(db.submission);

db.user.hasMany(db.submission);
db.submission.belongsTo(db.user);

db.course.hasMany(db.user);
db.user.belongsTo(db.course);

db.usertype.hasMany(db.user);
db.user.belongsTo(db.usertype);

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