module.exports=function(dateFrom, callback){
/*var date1 = new Date();*/
var date2 = new Date(dateFrom);
date2.setDate(date2.getDate() + 7);
var x = 1;

fs = require('fs')
dc = require('./dateConvert.js')
pd = require('./pullDate.js')
pdd = require('./pullDateDay.js')
pdh = require('./pullDateHour.js')

fs.readFile('cometData.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    var comets = JSON.parse(data);
    var results = [];

   comets.forEach(function(event){
     var newDate = new Date(pd(Number(event.JDate)));
     var realDate = pd(Number(event.JDate));
     //console.log(pdd(Number(event.JDate)));
     var day = pdd(Number(event.JDate));
     var hour = pdh(Number(event.JDate));
     // console.log(hour);
     event.JDate = day;
     event.Name0 = hour;
     // console.log(newDate);
     if (dateFrom < newDate && newDate < date2){
        if (x > 1){
            results.push(event);
        }
        else {
            results.push(event);
        }
      /*results = results + "," + JSON.stringify(event);*/
     }
   });
   
    /* console.log(results);*/
   callback(null, results);
 
});
};
