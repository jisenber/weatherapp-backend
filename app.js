var express = require('express');
var app = express();
var port  = 4200;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var passport = require('passport');
var MongoStore = require('connect-mongo')(expressSession);
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./backend/model/user');


mongoose.Promise = require('bluebird');
let MONGODB_URI =  process.env.MONGODB_URI || 'mongodb://localhost/invaders';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('start');
  })
  .catch(err => {
    console.error('App starting error', err.stack);
    process.exit(1);
  });

  // passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(expressSession({
  secret: process.env.EXPRESS_SES_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var itemRouter = require('./src/routes/itemRoutes');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/items', itemRouter);

app.listen(port, function() {
  console.log('Server is running on port: ', port);
});
