module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("activity", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notNull: { msg: "Title can not be empty!" } }
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Title can not be empty!" } }
        },
        Level: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    return Activity;
};