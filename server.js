require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const requestIp = require('request-ip');

var ipMiddleware = (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  next();
}

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.use(requestIp.mw());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  let ipaddress = req.clientIp;
  let language = req.acceptsLanguages();
  let software = req.get('User-Agent');

  res.json({
    ipaddress: ipaddress,
    language: language[0],
    software: software
  });
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
