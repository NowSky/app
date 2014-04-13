var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');

function wunderground_url()
{
	return 'http://api.wunderground.com/api/' + keys.wunderground;
}

function get_night(lat, lon)
{
	request(wunderground_url() + '/astronomy/q/' + lat + ',' + lon + '.json', function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var astronomy = JSON.parse(body);

			// console.log(astronomy.sun_phase.sunrise.hour);

			// console.log(astronomy.sun_phase.sunset.hour + ', ' + astronomy.sun_phase.sunrise.hour)

			return {
				"sunrise_hour": astronomy.sun_phase.sunrise.hour,
				"sunset_hour": astronomy.sun_phase.sunset.hour
			}
		}
	});
}

function get_condition(loc, hour, day)
{
	var lat = loc.lat;
	var lon = loc.lng;
	var hour_num = hour;
	var day_num = day;

	request(wunderground_url() + '/hourly/q/' + lat + ',' + lon + '.json', function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var forecast = JSON.parse(body);

			var night = get_night(lat, lon);

			// console.log(night.sunrise_hour + " " + night.sunset_hour);

			// console.log(forecast['hourly_forecast']);

			forecast['hourly_forecast'].forEach(function(time)
			{
				if(time.FCTTIME.hour == hour_num && time.FCTTIME.mday == day_num)
				{
					// console.log(time.condition);
					return {
						"condition": time.condition,
						
					}
				}
			});
	  }
	});

}

// Test
// get_condition('40.745695', '-74.02555389999999', 23, 12);
// get_night('40.745695', '-74.02555389999999');