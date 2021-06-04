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
<<<<<<< HEAD
            type: DataTypes.STRING
=======
       
>>>>>>> 5628624973df792413510dc8ddf9fb28997b9179
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
            type: DataTypes.INTEGER
        },
        Coins: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    User.removeAttribute('id');

    return User;
};