let express = require("express");
let twilio = require("twilio");
let credentials = require("./credentials.json");

let app = express();
const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

app.get("/token", function(req, res) {
  let username = req.query.username;
  console.log("username is: ", username);
  let token = new AccessToken(
    credentials.accountSid,
    credentials.apiSid,
    credentials.apiSecret,
    {
      identity: username,
      ttl: 40000
    }
  );

  let grant = new ChatGrant({ serviceSid: credentials.serviceSid });

  token.addGrant(grant);
  const tokenJwt = token.toJwt();
  console.log("token: " + tokenJwt);

  res.send(tokenJwt);
});

app.get("/", function(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});