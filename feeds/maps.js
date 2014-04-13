//request data from google geocode api

var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');

exports.get_content = function(loc, callback){
    
  request(generate_url(loc,keys.google), function (error, response, body) {
		if (!error && response.statusCode == 200) 
		{
		    var location = JSON.parse(body);
		    var coordinates = location['results'][0]['geometry']['location'];
		    callback(null, coordinates);
		    // console.log(coordinates);
		}
		else
		{
		    callback("error");
		}
  })
};

var generate_url = function(loc,api_key){
    return('https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&sensor=false&key=' + api_key);
}