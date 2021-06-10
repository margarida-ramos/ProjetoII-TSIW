module.exports = (sequelize, DataTypes) => {
    const Theme = sequelize.define("theme", {
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
        Shaders: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Shaders can not be empty!" } }
        },
        ImageURI: {
            type: DataTypes.STRING
        },
        Price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false
    });
    return Theme;
};