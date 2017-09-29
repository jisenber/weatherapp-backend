var express = require('express');
var app = express();
var port  = 4200;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./src/models/user');
var userRoutes = require('./src/routes/userRoutes');
var weatherRoutes = require('./src/routes/weatherRoutes');
app.use(cors());

var MONGODB_URI =  process.env.MONGODB_URI || 'mongodb://localhost/weather';

mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//start up passport
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(userRoutes);
app.use(weatherRoutes);

app.use(express.static('public'));

app.listen(port, function() {
  console.log('Server is running on port: ', port);
});
