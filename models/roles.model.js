module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Title can not be empty!" } }
        }
    }, {
        timestamps: false
    });
    return Role;
};