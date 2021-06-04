const express = require('express');
let router = express.Router();
const roleController = require('../controllers/roles.controller.js');

// middleware for all routes related with roles
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(roleController.findAll)
    .post(roleController.create);

router.route('/:roleID')
    .get(roleController.findOne)
    .delete(roleController.delete)
    .put(roleController.update);

router.all('*', function (req, res) {
    res.status(404).json({ message: 'ROLES: what???' });
})

// EXPORT ROUTES (required by APP)
module.exports = router;