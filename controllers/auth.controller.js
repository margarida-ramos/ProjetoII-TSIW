const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const db = require("../models");
const { role } = require("../models");
const { Op } = require("sequelize");
const User = db.user;
const Role = db.role;

exports.signup = async (req, res) => {
    try {
        // check duplicate Username
        let user = await User.findOne(
            { where: { Username: req.body.Username } }
        );
        if (user)
            return res.status(400).json({ message: "Failed! Username is already in use!" });
        // save User to database

        let role = await Role.findOne({
            where: {
                name: {
                    [Op.eq]: "user"
                }
            }
        });

        user = await User.create({
            Username: req.body.Username,
            Password: bcrypt.hashSync(req.body.Password, 8),
            courseId: req.body.courseId
        });

        await user.setRole(role.id); 
        return res.json({ message: "User was registered successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    };
};

exports.signupAdmin = async (req, res) => {
    try {
        // check duplicate Username
        let user = await User.findOne(
            { where: { Username: req.body.Username } }
        );
        if (user)
            return res.status(400).json({ message: "Failed! Username is already in use!" });
        // save User to database

        let role = await Role.findOne({
            where: {
                name: {
                    [Op.eq]: "admin"
                }
            }
        });

        user = await User.create({
            Username: req.body.Username,
            Password: bcrypt.hashSync(req.body.Password, 8),
            courseId: req.body.courseId
        });

        await user.setRole(role.id); // user role = 1 (regular use; not ADMIN)
        return res.json({ message: "User was registered successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    };
};

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    // verify request token given the JWT secret key
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.loggedUsername = decoded.id; // save user ID for future verifications
        next();
    });
};

exports.isAdmin = async (req, res, next) => {

    if (!req.body.loggedUsername) {
        res.status(403).send({
            message: "Require loggedUsername in body!"
        });
    }

    let user = await User.findByPk(req.body.loggedUsername);
    let role = await user.getRole();

    if (role.name === "admin")
        next();
    else return res.status(403).send({
        message: "Require Admin Role!"
    });
};

exports.isAdminOrLoggedUser = async (req, res, next) => {
    let user = await User.findByPk(req.body.loggedUsername);
    let role = await user.getRole();
    if (role.name === "admin" || user.username == req.body.loggedUsername)
        next();
    else return res.status(403).send({
        message: "Require Admin Role or Login!"
    });
};

exports.signin = async (req, res) => {
    try {
        let user = await User.findOne({ where: { Username: req.body.Username } });
        if (!user) return res.status(404).json({ message: "User Not found." });
        // tests a string (password in body) against a hash (password in database)
        const passwordIsValid = bcrypt.compareSync(
            req.body.Password, user.Password
        );
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null, message: "Invalid Password!"
            });
        }
        // sign the given payload (user ID) into a JWT payload – builds JWT token, using secret key
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        let role = await user.getRole();
        return res.status(200).json({
            //id: user.id, 
            Username: user.Username,
            //email: user.email,
            role: role.name.toUpperCase(), accessToken: token
        });
    } catch (err) { res.status(500).json({ message: err.message }); };
};