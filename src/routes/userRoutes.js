var Router = require('express').Router;
var passport = require('passport');
var User = require('../models/user.js');

var router = module.exports = new Router();

// router.post('/add/post', function(req, res) {
//   var user = new User(req.body);
//   user.save()
//     .then(user => {
//       res.json(`${user.username} added successfully`);
//     })
//     .catch(err => {
//       res.status(400).send(err);
//     });
// });

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  User.register(new User({username : req.body.username}), req.body.password, function(err, user) {
    console.log('LOGGING USER', user)
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
  console.log(`${req.user} signed In`);
  res.send(req.user);
});

router.get('/', function(req, res) {
  if(req.isAuthenticated()) {
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

//TODO: make a delete history route.
