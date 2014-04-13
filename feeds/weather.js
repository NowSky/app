var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');

function wunderground_url()
{
	return 'http://api.wunderground.com/api/' + keys.wunderground;
}

function get_night(lat, lon, callback)
{
	request(wunderground_url() + '/astronomy/q/' + lat + ',' + lon + '.json', function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var astronomy = JSON.parse(body);

			// console.log(astronomy.sun_phase.sunrise.hour);

			// console.log(astronomy.sun_phase.sunset.hour + ', ' + astronomy.sun_phase.sunrise.hour)

			callback({
				"sunrise_hour": astronomy.sun_phase.sunrise.hour,
				"sunset_hour": astronomy.sun_phase.sunset.hour
			});
		}
	});
}

exports.get_condition = function(loc, hour, day, callback)
{
	var lat = loc.lat;
	var lon = loc.lng;
	var hour_num = hour;
	var day_num = day;
	var night = "Day";

	request(wunderground_url() + '/hourly/q/' + lat + ',' + lon + '.json', function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var forecast = JSON.parse(body);
			var night = "night";
			get_night(lat, lon, function(resp)
			{
				night = resp;
			});

			// console.log(night.sunrise_hour + " " + night.sunset_hour);

			// console.log(forecast['hourly_forecast']);

			forecast['hourly_forecast'].forEach(function(time)
			{
				// console.log(time.FCTTIME.hour);
				
				console.log(time.FCTTIME.mday + " "+ day_num+""+"");
				// if(time.FCTTIME.mday == day_num)
				if(time.FCTTIME.hour == hour_num && time.FCTTIME.mday == day_num)
				{
					// console.log(time.condition);
					if(hour_num > 18 && hour_num < 6)
					{
						night = "Night";
					} else
					{
						night = "Day";
					}
					callback( null, {
						"name": "Cool Event in the Sky",
						"condition": time.condition,
						"night": night
					});
				}
			});
	  }
	});

}

exports.calc_events = function(user_loc, events, callback)
{
	var lat = user_loc.lat;
	var lon = user_loc.lng;
	var hour = 0;
	var day = 0;
	var conditions;
	var nighttime;
	var is_night;

	get_night(lat, lon, function(resp){
		nighttime = resp;
	});

	// console.log(events);

	request(wunderground_url() + '/hourly/q/' + lat + ',' + lon + '.json', function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var returns = [];
			conditions = JSON.parse(body);

			events.forEach(function(event)
			{
				hour = event.hour;
				day = event.day;

				if(hour > nighttime.sunset_hour || hour < nighttime.sunrise_hour)
				{
					is_night = true;
				} else
				{
					is_night = false;
				}

				conditions['hourly_forecast'].forEach(function(time)
				{
					if(time.FCTTIME.hour == hour && time.FCTTIME.mday == day)
					{
						returns.push({
							"name": event.name,
							"condition": time.condition,
							"hour": hour,
							"day": day,
							"sunset": nighttime.sunset_hour,
							"sunrise": nighttime.sunrise_hour,
							"night?": is_night
						});
					}
				});
			});

			callback(null, returns);
		} else
		{
			callback("api error");
		}
	});
}

// Test
// get_condition('40.745695', '-74.02555389999999', 23, 12);
// get_night('40.745695', '-74.02555389999999');