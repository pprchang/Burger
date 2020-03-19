var express = require('express');

var router = express.Router();
var db = require('../models');

// get route -> index
router.get('/', function(req, res) {
  res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.burger.findAll({}).then(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    var burgerObject = {
      burger_data: burgerData
    };
    res.render('index', burgerObject);
  });
});

// post route -> back to index
router.post('/burgers/create', function(req, res) {
  // takes the request object using it as input for burger.addBurger
  db.burger
    .create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    })
    .then(function(burgerData) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log(burgerData);
      res.redirect('/');
    });
});

// put route -> back to index
router.put('/burgers/:id', function(req, res) {
  db.burger
    .update(
      {
        devoured: true
      },
      {
        where: { id: req.params.id }
      }
    )
    .then(function(burgerData) {
      // wrapper for orm.js that using MySQL update callback will return a log to console,
      // render back to index with handle
      console.log(burgerData);
      // Send back response and let page reload from .then in Ajax
      res.sendStatus(200);
    });
});

module.exports = router;
