var express = require('express');
var app = express();
var port  = 4200;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');


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

var itemRouter = require('./src/routes/itemRoutes');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/items', itemRouter);

app.listen(port, function() {
  console.log('Server is running on port: ', port);
});
