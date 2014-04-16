var express = require('express');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var path = require('path');
var url = require('url');

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', function(req, res){
  res.render('index', { title: 'scraping stuff', images: [] })
});

app.get('/scrape-images', function(req, res){
  var reqUrl = req.query.url;
  request(reqUrl, function (error, response, html){
    if (!error && response.statusCode == 200){
      var $ = cheerio.load(html);
      var images = {};
      $('img').each(function(i, element){
        var src = element.attribs.src;
        var alt = element.attribs.alt;
        // var isImage = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        // && isImage.test(src);
        if (src) {
          var image;
          if (src.indexOf('http') == -1
            && src.indexOf('https') == -1
            && src.indexOf('www.') == -1
            && src.indexOf('.org') == -1
            && src.indexOf('.com') == -1
            && src.indexOf('.net') == -1
            && src.indexOf('.io') == -1)
          {
            image = { url: url.resolve(reqUrl, src), alt: alt };
          } else {
            image = { url: src, alt: alt };
          }
          images[i] = image;
        }
      });
      res.render('index', { title: 'scraping stuff', url: reqUrl, images: images })
    }
  });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
