module.exports = (sequelize, DataTypes) => {
    const Activitytype = sequelize.define("activitytype", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Title can not be empty!" } }
        }
    }, {
        timestamps: false
    });
    return Activitytype;
};