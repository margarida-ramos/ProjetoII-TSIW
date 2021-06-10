const express = require('express');
let router = express.Router();
const activitytypeController = require('../controllers/activitytypes.controller.js');
const authController = require("../controllers/auth.controller.js");

// middleware for all routes related with activitytypes
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, activitytypeController.findAll)
    .post(authController.verifyToken, authController.isAdmin, activitytypeController.create);

router.route('/:activitytypeID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, activitytypeController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, activitytypeController.delete)
    .put(authController.verifyToken, authController.isAdmin, activitytypeController.update);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACTIVITYTYPES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;