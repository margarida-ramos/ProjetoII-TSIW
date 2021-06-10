module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {

        Username: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
            validate: { notEmpty: { msg: "Username can not be empty!" } }
        },
        Name: {
            type: DataTypes.STRING
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Password can not be empty!" } }
        },
        BirthDate: {
            type: DataTypes.DATE
        },
        Sex: {
            type: DataTypes.STRING
        },
        ProfilePicURI: {
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
    User.removeAttribute('id');

    return User;
};