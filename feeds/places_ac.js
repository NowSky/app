//request data from the google places auto-complete api

var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');

exports.get_content = function(query, callback){
    request(generate_url(query,keys.google), function (error, response, body) {
	if(!error && response.statusCode == 200)
	{
	    var places = JSON.parse(body);
	    callback(null, places);
	}
	else
	{
	    callback("error");
	}
    })
}

var generate_url = function(query,api_key){
    
    return('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query + '&sensor=false&key=' + api_key);
}