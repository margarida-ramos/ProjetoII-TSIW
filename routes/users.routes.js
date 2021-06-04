const express = require('express');
let router = express.Router();
const userController = require('../controllers/users.controller.js');
const authController = require('../controllers/auth.controller.js');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next()
})

// middleware for all routes related with users
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, userController.findAll)
    .post(userController.create)

router.route('/:username')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, userController.findOne)
    .delete(authController.verifyToken, authController.isAdminOrLoggedUser, userController.delete)
    .put(authController.verifyToken, authController.isAdminOrLoggedUser, userController.update)

//send a predefined error message for invalid routes on USERS
router.all('*', function (req, res) {
    res.status(404).json({ message: 'USERS: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;