const express = require('express');
let router = express.Router();
const roleController = require('../controllers/roles.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with roles
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, roleController.findAll)
    .post(authController.verifyToken, authController.isAdmin, roleController.create);

router.route('/:roleID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, roleController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, roleController.delete);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'ROLES: Not Found.' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;