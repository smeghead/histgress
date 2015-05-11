var fs = require('fs');
var path = require('path');
require('date-utils');
var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

function find_images(d) {
  var dir = __dirname + '/../public/caps/' + d;
  try {
    console.log('start:' + d);
    var files = fs.readdirSync(dir);
    files.filter(function(file){
      return fs.statSync(path.join(dir, file)).isFile() && /.*\.png$/.test(file);
    });
    console.log('files:' + files);
    return files.map(function(filename){ return path.join('/caps', d, filename); });
  } catch(e) {
    concole.log(e);
  }
}
router.get('/get_images', function (req, res) {
  var ymd = new Date().toFormat('YYYYMMDD');
  if (req.query.date) {
    ymd = req.query.date;
  }

  var images = find_images(ymd);

  images = images.map(function(filename){
    return {url: filename, width: 1348, height: 989};
  });

  console.log(images);


  var json = {
    location: 'hoge',
    images: images
  };

  res.json(json);
});

module.exports = router;
/* vim:set expandtab ts=2 sts=2 sw=2 tw=0: */
