const express = require('express');
let router = express.Router();
const activityController = require('../controllers/activities.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with activities
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, activityController.findAll)
    .post(authController.verifyToken, authController.isAdmin, activityController.create);

router.route('/user/:username')
    .get(authController.verifyToken, authController.isAdmin, activityController.findByUser)

router.route('/:activityID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, activityController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, activityController.delete)
    .put(authController.verifyToken, authController.isAdmin, activityController.update);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACTIVITIES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;