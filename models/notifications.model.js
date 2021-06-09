module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("notification", {
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
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Link can not be empty!" } }
        },
        Date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        Read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { notEmpty: { msg: "ImageURI can not be empty!" } }
        }
    }, {
        timestamps: false
    });
    return Notification;
};