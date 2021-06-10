const express = require('express');
let router = express.Router();
const questionController = require('../controllers/questions.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with questions
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, questionController.findAll)
    .post(authController.verifyToken, authController.isAdmin, questionController.create);


router.route('/activity/:activityID')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, questionController.findByActivity)

router.route('/:questionID')
    .get(authController.verifyToken, authController.isAdmin, questionController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, questionController.delete)
    .put(authController.verifyToken, authController.isAdmin, questionController.update);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'QUESTIONS: Not Found.' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;