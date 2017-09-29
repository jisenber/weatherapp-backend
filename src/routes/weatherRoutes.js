var Router = require('express').Router;
var request = require('superagent');
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});

var router = module.exports = new Router();

//darksky call for a current forecast - no calendar
router.get('/weather', function(req, res) {
  request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.lat},${req.query.lng}`)
    .end((err, response) => {
      if(err) {
        console.log(err);
      }
      res.json(response.body);
    });
});

//takes in data send from the front end (a string) and uses that as the input for the Google Maps API geolocate method
router.post('/geolocate', function(req, res) {
  googleMapsClient.geocode({address: req.body.location} , function(err, response) {
    if (err) {
      console.log(err);
      res.json({success: false});
    } if (response.json.status === 'ZERO_RESULTS') {
      res.status(404).end();
    }
    else {
      console.log(response);
      res.json(response.json.results);
    }
  });
});

//darksky API call for a calendar forecast
router.get('/timeforecast', function(req, res) {
  request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.lat},${req.query.lng},${req.query.time}`)
    .end((err, response) => {
      if(err) {
        console.log(err);
      }
      res.json(response.body);
    });
});
