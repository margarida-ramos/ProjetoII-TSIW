const express = require('express');
let router = express.Router();
const notificationController = require('../controllers/notifications.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with notifications
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/:badgeID/user/:userID')
    .post(authController.verifyToken, authController.isAdminOrLoggedUser, notificationController.create)
    .delete(authController.verifyToken, authController.isAdminOrLoggedUser, notificationController.delete);

router.route('/:notificationID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, notificationController.findOne)
    .delete(authController.verifyToken, authController.isAdminOrLoggedUser, notificationController.delete)
    .put(authController.verifyToken, authController.isAdminOrLoggedUser, notificationController.read);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'NOTIFICATIONS: Not Found.' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;