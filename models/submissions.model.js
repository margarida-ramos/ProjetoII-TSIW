module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define("submission", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Message can not be empty!" } }
        },
        Link: {
            type: DataTypes.STRING
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        Read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false
    });
    return Submission;
};