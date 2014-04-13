var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');

function get_condition(lat, lon, hour, day)
{
	var hour_num = hour;
	var day_num = day;

	request('http://api.wunderground.com/api/' + keys.wunderground + '/hourly/q/' + lat + ',' + lon + '.json', function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var forecast = JSON.parse(body);

			forecast['hourly_forecast'].forEach(function(time)
			{
				if(time.FCTTIME.hour == hour_num && time.FCTTIME.mday == day_num)
				{
				    console.log(time.condition);
				    return(time.condition);
				}
			});
	  }
	});

}

// Test
get_condition('40.745695', '-74.02555389999999', 19, 12);
console.log(get_condition('40.745695', '-74.02555389999999', 19, 12));