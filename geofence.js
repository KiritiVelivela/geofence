// No third party module required: https is part of the Node.js API
const https = require("http");
const geolib = require("geolib");
var express = require('express');
 var app = express();

var i = 0;
var j = 0;
var check;
var checkbig;
var test = false;
var port = process.env.PORT || 3333;
const url =
  "http://test.peelabus.com/WebService.asmx/LiveTracking";
  setInterval(function(){

https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data
    // console.log("body += data");
  });
  res.on("end", () => {
    body = JSON.parse(body);
    // console.log(body.Result[0]);
      let lat = body.Result[0].LAT;
      let long = body.Result[0].LONG;
      check = geolib.isPointInCircle(
        {latitude: lat, longitude: long},
        {latitude: 17.809605, longitude: 83.387557},
        500
      );
      checkbig = geolib.isPointInCircle(
        {latitude: lat, longitude: long},
        {latitude: 17.809605, longitude: 83.387557},
        1000
      );
      console.log("hey");
  });
});
if (check == true) {
    if (i == 0) {
      console.log("insideradius:" +check + " enterorexit: Enter" );
  // res.json({insideradius: check, enterorexit: "Enter" });
  test = false;
  i++;
  j=0;
} else {
  console.log("insideradius:" +check+ " enterorexit: no change still enter" );
  // res.json({insideradius: check, enterorexit: "no change still enter" });
}
} else if (checkbig == true && test == false) {
    if (j == 0) {
    console.log("exitinggggg");
    console.log("insideradius:" +check+ " enterorexit: Exit" );
  // res.json({insideradius: check, enterorexit: "Exit" });
  test = true;
  j++;
  i=0;
  }
 else {
  console.log("insideradius:" +check+ " enterorexit: no change still exit" );
  // res.json({insideradius: check, enterorexit: "no change still exit" });
}
} else {
  console.log("insideradius: "+ check+ " enterorexit: yet to be known" );
   // res.json({insideradius: check, enterorexit: "yet to be known" });
}
}, 2*1000);


 app.get('/', function(req, res) {
   console.log(test);
   if (check == true) {
       if (i == 0) {
     res.json({insideradius: check, enterorexit: "Enter" });
     test = false;
     i++;
     j = 0;
   } else {
     res.json({insideradius: check, enterorexit: "no change still enter" });
   }

 } else if (checkbig == true && test == false) {
       if (j == 0) {
       console.log("exitinggggg");
     res.json({insideradius: check, enterorexit: "Exit" });
     test = true;
     j++;
     i =0;
     }
    else {
     res.json({insideradius: check, enterorexit: "no change still exit" });
   }
   } else {
      res.json({insideradius: check, enterorexit: "yet to be known" });
   }
 });
 app.listen(port, function() {
     console.log('Our app is running on http://localhost:' + port);
 });
