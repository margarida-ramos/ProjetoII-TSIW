const express = require('express');
let router = express.Router();
const classController = require('../controllers/classes.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with classes
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, classController.findAll)
    .post(authController.verifyToken, authController.isAdmin, classController.create);

router.route('/:classID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, classController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, classController.delete)
    .put(authController.verifyToken, authController.isAdmin, classController.update);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'CLASSES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;