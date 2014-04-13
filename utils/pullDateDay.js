module.exports=function(jdate) {
 
   var jd0 = jdate + 0.5 
   var z = Math.floor(jd0)
   var f = jd0 - z

   var a = 0.0
   var alp = 0.0
   if ( z < 2299161 ) {
     a = z
   } else {
     alp = Math.floor((z - 1867216.25)/36524.25)
     a = z + 1.0 + alp - Math.floor(alp/4.0)
   }

   var b = a + 1524
   var c = Math.floor((b - 122.1)/365.25)
   var d = Math.floor(365.25*c)
   var e = Math.floor((b - d)/30.6001)

   var dayt = b - d - Math.floor(30.6001*e) + f

   var mon = 0
   if (e < 13.5) {
      mon = e - 1
   } else {
      mon = e - 13
   }

   var yr = 0
   if (mon > 2.5) {
      yr = c - 4716
   } else {
      yr = c - 4715
   }

   var utht = Math.floor(24.0*(dayt - Math.floor(dayt)))
   var utmt = Math.floor(1440.0*(dayt - Math.floor(dayt) - utht/24.0))
   var utst = 86400.0*(dayt - Math.floor(dayt) - utht/24.0 - utmt/1440.0)

   return Math.floor(dayt) 

};
