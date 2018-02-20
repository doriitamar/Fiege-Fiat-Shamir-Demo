var express = require('express');
var config = require('../config');
var mathjs = require('mathjs');
var router = express.Router();
const n = config.FIRST_PRIME * config.SECOND_PRIME;
const k = 4;
let users = {};


router.get('/props', function(req, res, next) {
  res.json({
    k,
    n 
  });
});

router.post('/register', function(req, res, next) {
  console.log(req.body.username);
  users[req.body.username] = {key: req.body.key};
  console.log(JSON.stringify(users));
  res.status(201).send();
});

router.post('/proof', function(req, res, next) {
  let vector = [];

  for(let i = 0; i<k; i++) {
    vector.push(Math.random() > 0.5 ? 1 : 0);
  }
  users[req.body.username].a = vector;
  users[req.body.username].x = req.body.x;
  console.log(JSON.stringify(users));
  res.json(vector);
});

router.post('/verify', function(req, res, next) {
  const publicKey = users[req.body.username].key;
  const a = users[req.body.username].a;
  const x = users[req.body.username].x;

  let y = x;
  publicKey.forEach((el, index) => {
    console.log("el:"+el+" a:"+a[index]);
    y = y *  Math.pow(el, a[index]);
  })
  console.log("y:"+y);
  y = mathjs.mod(y, n);
  let ySq = mathjs.mod(Math.pow(req.body.y, 2), n)
  console.log(publicKey);
  console.log("y:"+y);
  console.log("req:"+ySq);
  if(y == ySq || y == -(ySq)) {
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html')
});

module.exports = router;
