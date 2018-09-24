const express = require('express');
const router = express.Router();
const pjson = require('../test.json');
const cars = require('../carsData.json');
var mysql      = require('mysql');
var moment = require('moment');
var addrValidator = require('wallet-address-validator');

var pool      =    mysql.createPool({
  connectionLimit : 100, //important
  host     : 'localhost',
  user     : 'Elias',
  password : '18003154dash',
  database : 'dpayments',
  debug    :  false
});


//Front Page
router.get('/', function (req, res) {
  res.render('index', { 
    title: 'Home', 
    message: pjson.formM, 
    name: pjson.name 
})
})
//Submit Button
router.post('/submit', function (req, res, next) {
    //Validate information
    //-------------------------
      var validated;
      var data = {
      InvoiceID : req.body.Invoice,
      SAddress :'', 
      RAddress : req.body.PubAddress, //attention
      Ammount :req.body.Ammount, 
      Date :moment().format('llll')
  };
    //Validate address information
    //-------------------------------
      var addrCheck = addrValidator.validate(data.RAddress, 'DASH');
        if(addrCheck)
          runQuery(setValue);
       else
       res.render('submit', {validated:false});

   function runQuery(callback) {
      pool.query('INSERT INTO paymentinfo SET ?', data, function (error, results, fields) {
        if (!error){
        console.log('Query executed.');
        validated = true;
        }
        else{
        console.log('Error while performing Query.');
        validated = false;
        }
      callback();
    });
  };
  function setValue() {
    var data2 = {
      id: req.body.Invoice, 
      address: req.body.PubAddress, 
      ammount: req.body.Ammount,
      validated:validated
      }; 
    res.render('submit', data2);
  };
  

    //Select Query
   // --------------
    /*pool.query('SELECT * from paymentinfo', function(err, rows, fields) {
        if (!err)
           console.log('The solution is: ', rows);
        else
        console.log('Error while performing Query.');
    });*/

    //Activate for POSTMAN use:
    // ---------------------------
    /*res.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify({ 
      Invoice: req.body.Invoice, 
      PubAddress: req.body.PubAddress, 
      Ammount: req.body.Ammount
    });
    res.end(json);*/
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
