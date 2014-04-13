
gc = require('./getComets.js')
gm = require('./getMeteorShowers.js')

console.log(new Date());
/*console.log(gc(new Date()));*/

gc(new Date(), function(error, resp){
    if (error)
    {
       console.log(error);
    }
    else
    {
       console.log(resp);
    }
});
