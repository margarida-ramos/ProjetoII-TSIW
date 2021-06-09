const express = require('express');
let router = express.Router();
const themeController = require('../controllers/themes.controller.js');
const { route } = require('./activities.routes.js');

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
    .get(themeController.findAll)
    .post(themeController.create);

router.route('/:themeID')
    .get(themeController.findOne)
    .delete(themeController.delete)
    .put(themeController.update);

router.route('/:themeID/user/:userID')
    .post(themeController.assignTheme)
    .delete(themeController.unassignTheme);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'THEMES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;