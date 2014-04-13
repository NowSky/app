module.exports=function(dateFrom){
/*var date1 = new Date();*/
var date2 = new Date(dateFrom);
date2.setDate(date2.getDate() + 30);
var x = 1;

fs = require('fs')
dc = require('./dateConvert.js')
pd = require('./pullDate.js')

fs.readFile('cometData.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    var comets = JSON.parse(data);
    var results = "";

   comets.forEach(function(event){
     var newDate = new Date(pd(Number(event.JDate)));
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
   
    /* console.log(results);*/
    return results;
 
});
};
