//request data from google time zones api to return the local time zone
//takes the coordinates of the local area as a json string

var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');
var date = new Date();
var timestamp = date.getTime()/1000;

var get_content = function(coords){

    request(generate_url(coords,keys.google), function (error, response, body) {
	if (!error && response.statusCode == 200) 
	{
	    console.log(body);
	    var response = JSON.parse(body);
	    var dst = response['dstOffset'];
	    var raw = response['rawOffset'];
	    var local_time = timestamp + dst + raw;
	    return(local_time);
	}
	else
	{
	    console.log("error");
	}
    })

};

var generate_url = function(loc, api_key){
    var lat = loc['lat'];
    var lng = loc['lng'];
    var date = new Date();
    return('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + timestamp + '&sensor=false&key=' + api_key);
}