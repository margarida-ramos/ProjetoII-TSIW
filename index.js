require('dotenv').config();         // read environment variables from .env file
const express = require('express');
const cors = require('cors');       // middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express();
const port = process.env.PORT || 8080;	 	// if not defined, use port 8080
const host = process.env.HOST || '127.0.0.1'; 	// if not defined, localhost


app.use(express.json());

// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'home -- PROJETO II api' });
});

// routing middleware for resource ACTIVITIES
app.use('/activities', require('./routes/activities.routes.js'))

// routing middleware for resource COURSES
app.use('/courses', require('./routes/courses.routes.js'))

// routing middleware for resource USERTYPES
app.use('/usertypes', require('./routes/usertypes.routes.js'))

// routing middleware for resource CLASSES
app.use('/classes', require('./routes/classes.routes.js'))

app.use('/users', require('./routes/users.routes.js'))


// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));