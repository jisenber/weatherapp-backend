var Router = require('express').Router;
var User = require('../models/user.js');
var request = require('superagent');

var router = module.exports = new Router();

router.get('/weather', function(req, res) {
  //find the user and add the search to their history
  User.findOne({username: req.query.user})
  .then(user => {
    user.history.push({dateSearched: new Date(Date.now()).toDateString(), locationSearched: `lat: ${req.query.lat}, lng: ${req.query.lng}`})
  })
  //make the request for the forecast data
  .then(() => {
    request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.lat},${req.query.lng}`)
    .end((err, response) => {
      if(err) {
        console.log(err);
      }
      res.send(response);
    });
  })
  .catch(err => {
    console.log(err);
  })
});
