const express = require('express');
let router = express.Router();
const activitytypeController = require('../controllers/activitytypes.controller.js');

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
    .get(activitytypeController.findAll)
    .post(activitytypeController.create);

router.route('/:activitytypeID')
    .get(activitytypeController.findOne)
    .delete(activitytypeController.delete)
    .put(activitytypeController.update);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACTIVITYTYPES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;