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

//export all models
db.activity = require("./activities.model.js")(sequelize, DataTypes);
db.user = require("./users.model.js")(sequelize, DataTypes);
db.course = require("./courses.model.js")(sequelize, DataTypes);
db.role = require("./roles.model.js")(sequelize, DataTypes);
db.class = require("./classes.model.js")(sequelize, DataTypes);
db.log = require("./logs.model.js")(sequelize, DataTypes);
db.badge = require("./badges.model.js")(sequelize, DataTypes);
db.notification = require("./notifications.model.js")(sequelize, DataTypes);
db.submission = require("./submissions.model.js")(sequelize, DataTypes);
db.question = require("./questions.model.js")(sequelize, DataTypes);
db.theme = require("./themes.model.js")(sequelize, DataTypes);
db.activitytype = require("./activitytypes.model.js")(sequelize, DataTypes);

//define the User-Badge m:n relationship
db.badge.belongsToMany(db.user, { through: 'userbadges' });
db.user.belongsToMany(db.badge, { through: 'userbadges', foreignKey: 'Username'  });

//define the User-Theme m:n relationship
db.theme.belongsToMany(db.user, { through: 'userthemes'});
db.user.belongsToMany(db.theme, { through: 'userthemes', foreignKey: 'Username' });

//define the User-Class m:n relationship
db.class.belongsToMany(db.user, { through: 'userclasses'});
db.user.belongsToMany(db.class, { through: 'userclasses', foreignKey: 'Username' });

//define the Class-Course m:n relationship
db.class.belongsToMany(db.course, { through: 'classcourses'});
db.course.belongsToMany(db.class, { through: 'classcourses'});

db.activitytype.hasMany(db.activity);
db.activity.belongsTo(db.activitytype);

//define 1:N relationships
db.course.hasMany(db.activity, {constraints: false});
db.activity.belongsTo(db.course, {constraints: false});

db.class.hasMany(db.activity, {constraints: false});
db.activity.belongsTo(db.class, {constraints: false});

db.user.hasMany(db.log, {foreignKey: 'Username'}, {constraints: false});
db.activity.hasMany(db.log, {constraints: false});

db.user.hasMany(db.notification, {foreignKey: 'Username'});

db.activity.hasMany(db.question);
db.question.belongsTo(db.activity);

db.activity.hasMany(db.submission);
db.submission.belongsTo(db.activity);

db.user.hasMany(db.submission, {foreignKey: 'Username'});

db.course.hasMany(db.user, {constraints: false});

db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.theme.hasOne(db.user, {foreignKey: 'SelectedTheme', constraints: false}); // constraints false para evitar colisão com a relação userthemes



/*
db.sequelize.sync({ force: false })
.then(() => {
    console.log('DB is successfully synchronized')
})
.catch(e => {
    console.log(e)
}); 

*/

module.exports = db;