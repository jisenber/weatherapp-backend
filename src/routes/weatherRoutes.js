var Router = require('express').Router;
var User = require('../models/user.js');
var request = require('superagent');
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});

var router = module.exports = new Router();

router.get('/weather', function(req, res) {
  //find the user and add the search to their history
  // User.findOne({username: req.query.user})
  // .then(user => {
  //   user.history.push({dateSearched: new Date(Date.now()).toDateString(), locationSearched: `lat: ${req.query.lat}, lng: ${req.query.lng}`})
  // })
  // //make the request for the forecast data
  // .then(() => {
    request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.lat},${req.query.lng}`)
    .end((err, response) => {
      if(err) {
        console.log(err);
      }
      res.json(response.body);
    });
  })
//   .catch(err => {
//     console.log(err);
//   // })
// });


router.post('/geolocate', function(req, res) {
  googleMapsClient.geocode({address: req.body.location} , function(err, response) {
    if (err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json(response.json.results);
    }
  });
});
