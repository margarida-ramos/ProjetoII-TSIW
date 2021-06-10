const express = require('express');
let router = express.Router();
const submissionController = require('../controllers/submissions.controller.js');
const authController = require("../controllers/auth.controller");

// middleware for all routes related with submissions
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, submissionController.findAll)
    .post(authController.verifyToken, authController.isAdminOrLoggedUser, submissionController.submit);

router.route('/user/:username')
    .get(authController.verifyToken, authController.isAdmin, submissionController.findByUser)

router.route('/activity/:activityID')
    .get(authController.verifyToken, authController.isAdmin, submissionController.findByActivity)

router.route('/:submissionID')
    .get(authController.verifyToken, authController.isAdmin, submissionController.findOne)
    .delete(authController.verifyToken, authController.isAdmin, submissionController.delete);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'SUBMISSIONS: Not Found.' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;