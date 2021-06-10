module.exports = (sequelize, DataTypes) => {
    const Badge = sequelize.define("badge", {
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
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Description can not be empty!" } }
        },
        Requirement: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Requirement can not be empty!" } }
        },
        ImageURI: {
            type: DataTypes.STRING
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
    return Badge;
};