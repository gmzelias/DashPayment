const express = require('express');
const router = express.Router();
const pjson = require('../test.json');
const cars = require('../carsData.json');


router.get('/', function (req, res) {
  res.render('index', { 
    title: 'Home', 
    message: pjson.formM, 
    name: pjson.name 
})
})

router.post('/submit', function (req, res, next) {
  console.log('hello');
  console.log(req.body);
  /*response = {
    id : req.body.first_name,
    address : req.body.last_name,
    ammount: req.body.gender
    };
  res.render('submit', { 
    title: 'Home', 
    message: pjson.formM, 
    name: pjson.name 
})*/
})

router.get('/about', function (req, res) {
  res.render('about', { 
    title: 'About Us', 
    message: pjson.description, 
    name: pjson.name 
})
})

router.get('/contact', function (req, res) {
  res.render('contact', { 
    title: 'Contact', 
    message: '555-555-5555', 
    name: pjson.name 
})
})

router.get('/:id', function (req, res) {
  var i = 0;
  switch(req.params.id) {
    case 'toyota': i = 0; break;
    case 'subaru': i = 1; break;
    case 'nissan': i = 2; 
}
  
  res.render('cars', { 
    currentBrand: req.params.id.charAt(0).toUpperCase() + req.params.id.substr(1),
    title: req.params.id,
    name: pjson.name,
    model1: cars[i].models[0], 
    model2: cars[i].models[1],
    model3: cars[i].models[2]
    })
})

module.exports = router;
