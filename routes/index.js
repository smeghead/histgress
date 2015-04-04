var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/get_images', function (req, res) {
  var json = {
    location: 'hoge',
    images: [
      {url: '/caps/20150403/0000.png'},
      {url: '/caps/20150403/1000.png'},
    ]
  };

  res.json(json);
});

module.exports = router;
