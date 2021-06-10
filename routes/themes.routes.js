const express = require('express');
let router = express.Router();
const themeController = require('../controllers/themes.controller.js');
const { route } = require('./activities.routes.js');
const authController = require('../controllers/auth.controller.js');

// middleware for all routes related with themes
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin,themeController.findAll)
    .post(authController.verifyToken, authController.isAdmin, themeController.create);

router.route('/:themeID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, themeController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, themeController.delete)
    .put(authController.verifyToken, authController.isAdmin, themeController.update);

router.route('/:themeID/user/:userID')
    .put(authController.verifyToken, authController.isAdminOrLoggedUser, themeController.selectTheme)
    .delete(authController.verifyToken, authController.isAdmin, themeController.unassignTheme);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'THEMES: Not Found.' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;