var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-d2d6navz25q1fi11.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"Hr9QR7HwEX4W5Ur8cQbPgHDycOwpHRFX","client_secret":"ekwySv3nHXumcaZnnJMAMHUg0FlnBQO6OAoj6ZN78MKKz-XHanUDJ3oBt9tpI-Pk","audience":"https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
