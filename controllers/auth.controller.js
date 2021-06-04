const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

exports.signup = async (req, res) => {
    try {
        // check duplicate Username
        let user = await User.findOne(
            { where: { Username: req.body.Username } }
        );
        if (user)
            return res.status(400).json({ message: "Failed! Username is already in use!" });
        // save User to database
   
        user = await User.create({
            Username: req.body.Username,
            Password: bcrypt.hashSync(req.body.Password, 8),
            roleId: req.body.roleId,
            courseId: req.body.courseId
        });
    

        if (req.body.role) {
            let role = await Role.findOne({ where: { name: req.body.role } });
            if (role)
                await user.setRole(role);
        }
        else
            await user.setRole(1); // user role = 1 (regular use; not ADMIN)
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
        req.loggedUserId = decoded.id; // save user ID for future verifications
        next();
    });
};

exports.isAdmin = async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let role = await user.getRole();
    if (role.name === "admin")
        next();
    return res.status(403).send({
        message: "Require Admin Role!"
    });
};
exports.isAdminOrLoggedUser = async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let role = await user.getRole();
    if (role.name === "admin" || user.id == req.params.userID)
        next();
    return res.status(403).send({
        message: "Require Admin Role!"
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
             role: role.Description.toUpperCase(), accessToken: token
        });
    } catch (err) { res.status(500).json({ message: err.message }); };
};