var Router = require('express').Router;
var createError = require('http-errors');
var Item = require('../models/Item');

var router = module.exports = new Router();

router.post('/add/post', function(req, res) {
  var item = new Item(req.body);
  item.save()
    .then(item => {
      res.json('Item added successfully');
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

router.get('/', function(req, res) {
  Item.find(function(err, itms) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

//TODO: make a delete history route.
