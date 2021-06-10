const express = require('express');
let router = express.Router();
const badgeController = require('../controllers/badges.controller.js');
const authController = require("../controllers/auth.controller");
const { route } = require('./activities.routes.js');

// middleware for all routes related with badges
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, badgeController.findAll)
    .post(authController.verifyToken, authController.isAdmin, badgeController.create);

router.route('/:badgeID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, badgeController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, badgeController.delete)
    .put(authController.verifyToken, authController.isAdmin, badgeController.update);

router.route('/:badgeID/user/:username')
    .post(authController.verifyToken, authController.isAdminOrLoggedUser, badgeController.assignBadge)
    .delete(authController.verifyToken, authController.isAdmin, badgeController.unassignBadge);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'BADGES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;