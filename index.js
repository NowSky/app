var express = require('express');
var request = require('request');

var weather = require('./feeds/weather.js');
var sky_feeds = require('./feeds/sky_feeds.js');
var maps = require('./feeds/maps.js');
var gmt = require('./feeds/gmt_time.js');

var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/location/:place', function(req, res)
{
	var location = req.params.place;
	var results = [];
	var time = 0;

	// maps.get_content(location, function(error, resp){
	// 	if (error)
	// 	{
	// 		console.log(error);
	// 	} else
	// 	{
	// 		//Resp contains lat and lng coords
	// 		res.send(resp);
	// 	}
	// });

	gmt.get_content(function(error, resp)
	{
		if(error)
		{
			console.log('You dun FUCKED UP A A RON');
		} else
		{
			res.send(resp);
			// time = resp;
		}
	});

	// console.log(time.getFullYear());
	// res.send(results);

});

app.listen(8000, function(){
	console.log('Server started');
});