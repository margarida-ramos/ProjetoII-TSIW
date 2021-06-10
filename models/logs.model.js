module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define("log", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Description can not be empty!" } }
        },
        Date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false
    });
    return Log;
};