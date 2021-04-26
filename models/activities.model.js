module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("activity", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Title can not be empty!" } }
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
    return Activity;
};