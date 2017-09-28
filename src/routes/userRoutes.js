var Router = require('express').Router;
var passport = require('passport');
var User = require('../models/user.js');

var router = module.exports = new Router();

router.post('/signup', function(req, res) {
  console.log(req.body);
  User.register(new User({username : req.body.username}), req.body.password, function(err, user) {
    console.log('LOGGING USER', user);
    if (err) {
      res.send(err);
      return;
    }
    passport.authenticate('local')(req, res, function () {
      res.send('user authenticated and signed up');
    });
  });
});

//passport will give a 401 unauthorized error by default is login is not successful
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user.history);
});

router.get('/', function(req, res) {
  if(req.isAuthenticated()) {
    console.log('user is authenticated!');
    res.send(req.user.history);
  } else {
    res.send('no user logged in');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.post('/history', function(req, res) {
  console.log(req.body);
  var query = {username: req.body.username};
  User.findOneAndUpdate(query, {$push:{history: req.body.history}}, {new: true}, (err, updatedUser) => {
    if(err) {
      console.log(err);
      res.json({'success': false});
    }
    res.json(updatedUser.history);
  });
});


router.get('/history', function(req, res) {
  User.findOne({username: req.query.user})
    .then(user => {
      res.json(user.history);
    })
    .catch(err => {
      console.log(err);
    });
});
