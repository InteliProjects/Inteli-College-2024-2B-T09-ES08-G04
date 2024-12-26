// DEFAULT APP

var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-d2d6navz25q1fi11.us.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'aGD6eymjd0fmTs85NUi5R7eRpQmTGeKd',
    client_secret: '4HBVTqz5BOfcxLGFVOTBxBhnBgEVUEtJ_8sTkX6yGOyUNycyg5FV5KS0auSft1h5',
    audience: 'https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
