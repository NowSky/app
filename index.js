var express = require('express');
var request = require('request');

var weather = require('./feeds/weather.js');
var sky_feeds = require('./feeds/sky_feeds.js');
var maps = require('./feeds/maps.js');
var gmt = require('./feeds/gmt_time.js');
var comets = require('./utils/getComets.js');

var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/events', function(req, res)
{
	var location = req.params.place;
	var results = [];
	var time = 0;

	maps.get_content(location, function(error, resp){
		if (error)
		{
			console.log(error);
		} else
		{
			//Resp contains lat and lng coords
			//Add new weather shit
			var duh = resp;
			res.send(duh);
		}
	});

	// console.log(time.getFullYear());
	// res.send(results);

});

// TO DO
// change get comets to return json array
// do night time logic

app.get('/location/:place', function(req, res){
	//event shit
	var events = [];
	var location = req.params.place;
	var loc = {};
	var returns = [];
	gmt.get_content(function(error, resp)
	{
		if(error)
		{
			console.log('You dun FUCKED UP A A RON');
		} else
		{
			comets(resp, function(error, x)
			{
				events = x;

				maps.get_content(location, function(error, resp)
				{
					if (error)
					{
						console.log(error);
					} else
					{
						//Resp contains lat and lng coords
						//Add new weather shit
						loc_obj = resp;

						// res.send(events);
						console.log(events);

						events.forEach(function(y)
						{
							weather.get_condition(loc_obj, y.JDate.getHours(), y.JDate.getDay(), function(error, resp){
								console.log(resp);
								returns.push(resp);
							});
						});

						res.send(returns);

					}
				});

			});
			// time = resp;
		}
	});
});

app.listen(8000, function(){
	console.log('Server started');
});