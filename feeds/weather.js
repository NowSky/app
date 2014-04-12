var request = require('request');

function get_condition(lat, lon, hour)
{
	var hour_num = hour;

	request('http://api.wunderground.com/api/e047945aa605784a/hourly/q/' + lat + ',' + lon + '.json', function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var forecast = JSON.parse(body);

			forecast['hourly_forecast'].forEach(function(time)
			{
				if(time.FCTTIME.hour == hour_num)
				{
					console.log(time.condition);
				}
			});
	  }
	});

}

//Test
// get_condition('40.745695', '-74.02555389999999', 19);