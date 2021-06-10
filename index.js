require('dotenv').config();         // read environment variables from .env file
const express = require('express');
const cors = require('cors');       // middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express();
const port = process.env.PORT || 8080;	 	// if not defined, use port 8080
const host = process.env.HOST || '127.0.0.1'; 	// if not defined, localhost


app.use(express.json());

// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'Home -- PROJETO II api' });
});

// routing middleware for resources
app.use('/auth', require('./routes/auth.routes.js'))
app.use('/activities', require('./routes/activities.routes.js'))
app.use('/activitytypes', require('./routes/activitytypes.routes.js'))
app.use('/courses', require('./routes/courses.routes.js'))
app.use('/roles', require('./routes/roles.routes.js'))
app.use('/classes', require('./routes/classes.routes.js'))
app.use('/badges', require('./routes/badges.routes.js'))
app.use('/logs', require('./routes/logs.routes.js'))
app.use('/notifications', require('./routes/notifications.routes.js'))
app.use('/questions', require('./routes/questions.routes.js'))
app.use('/submissions', require('./routes/submissions.routes.js'))
app.use('/users', require('./routes/users.routes.js'))
app.use('/themes', require('./routes/themes.routes.js'))

// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));