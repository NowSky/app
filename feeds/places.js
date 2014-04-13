//request data from the google place api

var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');

exports.get_content = function(query, callback){
    request(generate_url(query,keys.google), function (error, response, body) {
    	if (!error && response.statusCode == 200)
	{
	    console.log(body);
	    var places = JSON.parse(body);
	    var name = places['formatted_address'];
	    callback(null, name);
	}
	else
	{
	    callback("error");
	}
    })
}

var generate_url = function(query,api_key){
    
    return('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + query + '&sensor=false&key=' + api_key);

}