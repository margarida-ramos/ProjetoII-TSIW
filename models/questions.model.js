module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("question", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Question: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Question can not be empty!" } }
        },
        Answers: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Answers can not be empty!" } }
        },
        RightAnswers: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "RightAnswers can not be empty!" } }
        },
        ImageURI: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
    return Question;
};