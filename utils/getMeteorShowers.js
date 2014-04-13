module.exports=function(dateFrom){
/*var dateFrom = new Date();*/
var date2 = new Date(dateFrom);
date2.setDate(date2.getDate() + 30);
var x = 1;

fs = require('fs')

fs.readFile('meteorShowers.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    var comets = JSON.parse(data);
    var results = "";

   comets.forEach(function(event){
     var newDate = new Date(event.Date);
        console.log(newDate);
	if (dateFrom < newDate && newDate < date2){
        if (x > 1){
            results = results + "," + JSON.stringify(event);
        }
        else {
            results = results + JSON.stringify(event);
        }
      /*results = results + "," + JSON.stringify(event);*/
     }
   });
  
    return results;
 
});
};
