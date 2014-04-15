var express = require('express');
var request = require('request');

var weather = require('./feeds/weather.js');
var sky_feeds = require('./feeds/sky_feeds.js');
var maps = require('./feeds/maps.js');
var gmt = require('./feeds/gmt_time.js');
var comets = require('./utils/getComets.js');
var places = require('./feeds/places.js');
var places_ac = require('./feeds/places_ac.js');
var tonight = require('./utils/getTonightSkyHTML.js');

var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/places/:query', function(req, res){
    
    var query = req.params.query;
    
    places.get_content(query, function(error, resp){
	if(error)
	{
	    console.log(error);
	}
	else
	{
	    var result = resp;
	    res.send(result);
	}
    });
});

app.get('/places_ac/:query', function(req, res){
    
    var query = req.params.query;

    places.get_content(Query, function(error, resp){
	if(error)
	{
	    console.log(error);
	}
	else
	{
	    var result = resp;
	    res.send(Result);
	}
    });
});


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

app.get('/tonight', function(req, res){
	tonight(function(error, resp){
		if(error)
		{
			res.send("NOPE");
		} else
		{
			res.send(resp);
		}
	})
});

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
			console.log('Error');
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
						loc_obj = resp;

						// console.log(events);

						var test_events = [
						{
							"name": "Meteor Shower",
							"hour": 20,
							"day": 14
						},
						{
							"name": "Comet Passing",
							"hour": 22,
							"day": 14
						},
						{
							"name": "Meteor Shower",
							"hour": 4,
							"day": 15
						},
						{
							"name": "Asteroid",
							"hour": 10,
							"day": 15
						},
						{
							"name": "Jupiter",
							"hour": 1,
							"day": 14
						},
						{
							"name": "Space Junk",
							"hour": 23,
							"day": 13
						}
						];

						weather.calc_events(loc_obj, test_events, function(error, resp)
						{
							if(error)
							{
								res.send(error);
							} else
							{
								res.send(resp);
							}
						});

					}
				});

			});
		}
	});
});

app.listen(8080, function(){
	console.log('Server started');
});
