// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
////COMPLETED/////////

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
let date = req.params.date;
let unix = new Date(parseInt(req.params.date));
 if(req.params.date == null) {
   dateNow = Date.now();
   res.json({unix: dateNow, utc: new Date(dateNow).toUTCString()});
}else if(unix instanceof Date && !isNaN(unix)){
    if(!isNaN(date)){
      res.json({unix: unix.getTime(), utc: unix.toUTCString()});
    }else{
      date = new Date(date); 
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
  }else{
    res.json({ error : "Invalid Date" })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
