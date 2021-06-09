module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("activity", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Title can not be empty!" } }
        },
        Level: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false
    });
    return Activity;
};