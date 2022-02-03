//Including the Modules
const express = require('express');
const bodyParser = require('body-parser');
const signup = require('./signup');
const login = require('./login');
const updatemod = require('./updatemoderator');
const moderator = require('./moderator');
const particularpost = require('./particularpost');
const poststatusupdate = require('./poststatusupdate');
const flagsupdate = require('./flagsupdate');
const admin = require('./admin');
var _ = require('lodash');
const generalQuery = require('./utils/generalQuery');
var cors = require('cors');
const morgan = require('morgan');
const app = express();
const path = require('path');
app.use(morgan('dev'));

app.get('/api/testing', (req, res) => {
  res.json('Meest CMS')
})

app.use(cors());
enableCORS(app);
function enableCORS(expressInstance) {
  expressInstance.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    next();
  });
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));
// Signup Process
app.use(signup.app);

// Login Process
app.use(login.app);

// Sending Moderator Data and Update Moderator
app.use(updatemod.app);

// Sending the post data to the moderator page
app.use(moderator.app);
// app.use(checkuser);
// Fetchinng the particular post from post data for moderate.
app.use(particularpost.app);

// Update the particualr post.
app.use(poststatusupdate.app);

//
app.use(flagsupdate.app);

// Admin Portal
// app.use(admin.app);

require('./routes/admin.routes')(app);

var port = process.env.PORT || '2005';

app.get('/api/testing', (req, res) => {
  res.json('Meest CMS');
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Handle 404 - Keep this as a last route
app.use(function (req, res, next) {
  res.status(404);
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port,"0.0.0.0", () => console.log(`Server is running at port ${port}`));
