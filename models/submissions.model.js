module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define("submission", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Report: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Message can not be empty!" } }
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false
    });
    return Submission;
};