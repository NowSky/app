module.exports=function(){
var http = require("http");
var S = require('string');

var url = "http://www.cfa.harvard.edu/pao/skyreport/";
var data = "";

// Utility function that downloads a URL and invokes
// callback with the data.
  http.get(url, function(res) {
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
     return S(data).between('<!-- start content -->', '<!-- end content -->').s;
    });
  }).on("error", function() {
   return "Sorry, there was an error."; 
  });
};
