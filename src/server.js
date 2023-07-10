const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const User = require('./models/User');

const app = express();
const port = 5000; 

app.use(express.json());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded( {extended: false} ));

const sessionConfig = {
  secret: 'thisIsASecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', routes);








mongoose.connect('mongodb://localhost/pdf_manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

