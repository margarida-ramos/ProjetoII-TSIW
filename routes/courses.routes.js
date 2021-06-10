const express = require('express');
let router = express.Router();
const courseController = require('../controllers/courses.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with courses
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, courseController.findAll)
    .post(authController.verifyToken, authController.isAdmin, courseController.create);

router.route('/:courseID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, courseController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, courseController.delete)
    .put(authController.verifyToken, authController.isAdmin, courseController.update);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'COURSES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;