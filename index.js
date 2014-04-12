var express = require('express');
var request = require('request');

var weather = require('feeds/weather.js');
var sky_feeds = require('feeds/sky_feeds.js');
var maps = require('feeds/maps.js');

var app = express();

app.use('/', express.static(__dirname + '/public'));

app.get('/hello', function(req, res)
{
	res.send('Hello World');
});

app.listen(8000, function(){
	console.log('Server started');
});