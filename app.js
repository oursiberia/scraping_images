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
  res.render('index', { title: 'scraping stuff', images: {} })
});


// main scraping function
app.get('/scrape-images', function(req, res){
  // takes the 'url' attribute from the 'req' object passed through the form in 'index'
  var reqUrl = req.query.url;
  // empty array to store image URLs
  var images = [];
  // uses the 'request' module to load up the user-inputted site
  request(reqUrl, function (error, response, html){
    if (!error && response.statusCode == 200){
      // passes HTML to the cheerio module for parsing
      var $ = cheerio.load(html);
      // grabs each <img> tag on the page
      $('img').each(function(i, element){
        // grabs 'src' attribute
        var src = element.attribs.src;
        // grabs 'alt' tag
        var alt = element.attribs.alt;
        // checks whether the <img> tag in fact has an 'src' attribute
        if (src) {

          var image;
          // checks for critical img URL components
          if (src.indexOf('http') == -1
            && src.indexOf('https') == -1
            && src.indexOf('www.') == -1
            && src.indexOf('.org') == -1
            && src.indexOf('.com') == -1
            && src.indexOf('.net') == -1
            && src.indexOf('.io') == -1)
          {
            // creates an image object with 'url' and 'alt' attributes
            // url module corrects for broken or relative URLs
            image = { url: url.resolve(reqUrl, src), alt: alt };
          } else {
            image = { url: src, alt: alt };
          }
          // pushes the 'image' object into our existing array
          images.push(image);
        }
      });
    };
    // sends the data off to 'index.jade'
    res.render('index', { title: 'scraping stuff', url: reqUrl, images: images })
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
