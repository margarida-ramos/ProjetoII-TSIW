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
            validate: { notNull: { msg: "Title can not be empty!" } }
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Description can not be empty!" } }
        },
        Requirement: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Requirement can not be empty!" } }
        },
        ImageURI: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
    return Badge;
};