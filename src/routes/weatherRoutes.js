var Router = require('express').Router;
var request = require('superagent');
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});

var router = module.exports = new Router();

router.get('/weather', function(req, res) {
  request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.lat},${req.query.lng}`)
    .end((err, response) => {
      if(err) {
        console.log(err);
      }
      res.json(response.body);
    });
});



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

router.get('/timeforecast', function(req, res) {
  request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.lat},${req.query.lng},${req.query.time}`)
    .end((err, response) => {
      if(err) {
        console.log(err);
      }
      res.json(response.body);
    });
});
