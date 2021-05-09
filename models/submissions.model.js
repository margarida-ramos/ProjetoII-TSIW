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
            validate: { notNull: { msg: "Message can not be empty!" } }
        },
        Link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Link can not be empty!" } }
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: { notNull: { msg: "Date can not be empty!" } }
        },
        Read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { notNull: { msg: "Read can not be empty!" } }
        }
    }, {
        timestamps: false
    });
    return Submission;
};