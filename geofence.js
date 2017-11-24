// No third party module required: https is part of the Node.js API
const https = require("http");
const geolib = require("geolib");
var express = require('express');
 var app = express();

var check;
var port = process.env.PORT || 3333;
const url =
  "http://test.peelabus.com/WebService.asmx/LiveTracking";
  setInterval(function(){

https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    console.log(body += data);
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(body.Result[0]);
    // console.log(
    //   `City: ${body.Result[0].Busid} -`,
    //   `Latitude: ${body.Result[0].LAT} -`,
    //   `Longitude: ${body.Result[0].LONG}` );
      let lat = body.Result[0].LAT;
      let long = body.Result[0].LONG;
      console.log(lat);
      console.log(long);
      // Output the circle
      // console.log(circle(5));
      // checks if 51.525, 7.4575 is within a radius of 5km from 51.5175, 7.4678
      console.log(geolib.isPointInCircle(
        {latitude: lat, longitude: long},
        {latitude: 51.5175, longitude: 7.4678},
        5000
      ));
      check = geolib.isPointInCircle(
        {latitude: lat, longitude: long},
        {latitude: 51.5175, longitude: 7.4678},
        5000
      );
  });
});
}, 10*1000);


 app.get('/', function(req, res) {
     res.json(check);
 });
 app.listen(port, function() {
     console.log('Our app is running on http://localhost:' + port);
 });
// geo() {
//   geolib.isPointInCircle(
//     {latitude: 51.525, longitude: 7.4575},
//     {latitude: 51.5175, longitude: 7.4678},
//     5000
//   );
//
// }
