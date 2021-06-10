const express = require('express');
let router = express.Router();
const logController = require('../controllers/logs.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with logs
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, logController.findAll)
    .post(authController.verifyToken, authController.isAdminOrLoggedUser, logController.create)

router.route('/:logID')
    .get(authController.verifyToken, authController.isAdmin, logController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, logController.delete)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'LOGS: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;