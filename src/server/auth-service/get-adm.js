// O código abaixo pega os usuários que possuem a permissão especifica, este caso admin

// DEFAULT APP

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkM3TklpVGtiMUduUENEeDVHN0VOWiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kMmQ2bmF2ejI1cTFmaTExLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJEMzRnU2toYTdMbHNsekoySXNqWm5zSENIeEV5OEZuYUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtZDJkNm5hdnoyNXExZmkxMS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTczMzMzNTUyMSwiZXhwIjoxNzM1OTI3NTIxLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV9jb25maWcgdXBkYXRlOnNjaW1fY29uZmlnIGRlbGV0ZTpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV90b2tlbiByZWFkOnNjaW1fdG9rZW4gZGVsZXRlOnNjaW1fdG9rZW4gZGVsZXRlOnBob25lX3Byb3ZpZGVycyBjcmVhdGU6cGhvbmVfcHJvdmlkZXJzIHJlYWQ6cGhvbmVfcHJvdmlkZXJzIHVwZGF0ZTpwaG9uZV9wcm92aWRlcnMgZGVsZXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6cGhvbmVfdGVtcGxhdGVzIHJlYWQ6cGhvbmVfdGVtcGxhdGVzIHVwZGF0ZTpwaG9uZV90ZW1wbGF0ZXMgY3JlYXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmVuY3J5cHRpb25fa2V5cyB1cGRhdGU6ZW5jcnlwdGlvbl9rZXlzIGRlbGV0ZTplbmNyeXB0aW9uX2tleXMgcmVhZDpzZXNzaW9ucyBkZWxldGU6c2Vzc2lvbnMgcmVhZDpyZWZyZXNoX3Rva2VucyBkZWxldGU6cmVmcmVzaF90b2tlbnMgY3JlYXRlOnNlbGZfc2VydmljZV9wcm9maWxlcyByZWFkOnNlbGZfc2VydmljZV9wcm9maWxlcyB1cGRhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIGRlbGV0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgY3JlYXRlOnNzb19hY2Nlc3NfdGlja2V0cyBkZWxldGU6c3NvX2FjY2Vzc190aWNrZXRzIHJlYWQ6Zm9ybXMgdXBkYXRlOmZvcm1zIGRlbGV0ZTpmb3JtcyBjcmVhdGU6Zm9ybXMgcmVhZDpmbG93cyB1cGRhdGU6Zmxvd3MgZGVsZXRlOmZsb3dzIGNyZWF0ZTpmbG93cyByZWFkOmZsb3dzX3ZhdWx0IHJlYWQ6Zmxvd3NfdmF1bHRfY29ubmVjdGlvbnMgdXBkYXRlOmZsb3dzX3ZhdWx0X2Nvbm5lY3Rpb25zIGRlbGV0ZTpmbG93c192YXVsdF9jb25uZWN0aW9ucyBjcmVhdGU6Zmxvd3NfdmF1bHRfY29ubmVjdGlvbnMgcmVhZDpmbG93c19leGVjdXRpb25zIGRlbGV0ZTpmbG93c19leGVjdXRpb25zIHJlYWQ6Y29ubmVjdGlvbnNfb3B0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnNfb3B0aW9ucyByZWFkOnNlbGZfc2VydmljZV9wcm9maWxlX2N1c3RvbV90ZXh0cyB1cGRhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVfY3VzdG9tX3RleHRzIHJlYWQ6Y2xpZW50X2NyZWRlbnRpYWxzIGNyZWF0ZTpjbGllbnRfY3JlZGVudGlhbHMgdXBkYXRlOmNsaWVudF9jcmVkZW50aWFscyBkZWxldGU6Y2xpZW50X2NyZWRlbnRpYWxzIHJlYWQ6b3JnYW5pemF0aW9uX2NsaWVudF9ncmFudHMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jbGllbnRfZ3JhbnRzIGRlbGV0ZTpvcmdhbml6YXRpb25fY2xpZW50X2dyYW50cyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6IkQzNGdTa2hhN0xsc2x6SjJJc2pabnNIQ0h4RXk4Rm5hIn0.Ik50msYNhSx8QJegMzv6Tarcol05fdSMgPHgUCneEZ8a6XtU1o9xSu-6D53S5qhzIBk5JXh8FuDp8Zj7VU4HFNlUJ9D3jl1nErjw2ltE_gM7-QRdC9s3_1og-W-qzHyVDC9M9q_cOGZ6EXFTDoNXVRoL8gFA7ouwxgTdZDN3mNq79PAWGS_bYi9sl0LNLU6eCvCR0wz8vcL8Hqydfh5FxYVVek6Zv0CwAgzWhKP0bPssTpjMzJUgVdcsfHnCQHsLEvgJN_S1mfMgDhPUCkhL9xh_azxGVzBJvinuMCjvvCxjWPuxVQ7WsE_l3PZM51EhQ4utKeJOCzAbQ_FDNJGgoA");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/roles/rol_v29cDvDN5h4xp7fK/users", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


// var axios = require("axios").default;

// var options = {
//   method: 'POST',
//   url: 'https://dev-d2d6navz25q1fi11.us.auth0.com/oauth/token',
//   headers: {'content-type': 'application/x-www-form-urlencoded'},
//   data: new URLSearchParams({
//     grant_type: 'client_credentials',
//     client_id: 'aGD6eymjd0fmTs85NUi5R7eRpQmTGeKd',
//     client_secret: '4HBVTqz5BOfcxLGFVOTBxBhnBgEVUEtJ_8sTkX6yGOyUNycyg5FV5KS0auSft1h5',
//     audience: 'https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/'
//   })
// };

// const axios = require("axios").default;

// var options = {
//   method: 'POST',
//   url: 'https://dev-d2d6navz25q1fi11.us.auth0.com/oauth/token',
//   headers: {'content-type': 'application/x-www-form-urlencoded'},
//   data: new URLSearchParams({
//     grant_type: 'client_credentials',
//     client_id: 'aGD6eymjd0fmTs85NUi5R7eRpQmTGeKd',
//     client_secret: '4HBVTqz5BOfcxLGFVOTBxBhnBgEVUEtJ_8sTkX6yGOyUNycyg5FV5KS0auSft1h5',
//     audience: 'https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/'
//   })
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
//   const TOKEN = response.data;
// }).catch(function (error) {
//   console.error(error);
// });


// // var TOKEN = await getToken(); 

// // var myHeaders = new Headers();
// // myHeaders.append("Accept", "application/json");
// // myHeaders.append("Authorization", "Bearer ${TOKEN}");
// // var requestOptions = {
// //   method: 'GET',
// //   headers: myHeaders,
// //   redirect: 'follow'
// // };

// // fetch("https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/roles/rol_v29cDvDN5h4xp7fK/users", requestOptions)
// //   .then(response => response.text())
// //   .then(result => console.log(result))
// //   .catch(error => console.log('error', error));
// //


// // async function getToken() {
// //   try {
// //     const options = {
// //       method: 'POST',
// //       url: 'https://dev-d2d6navz25q1fi11.us.auth0.com/oauth/token',
// //       headers: { 'content-type': 'application/x-www-form-urlencoded' },
// //       data: new URLSearchParams({
// //         grant_type: 'client_credentials',
// //         client_id: 'aGD6eymjd0fmTs85NUi5R7eRpQmTGeKd',
// //         client_secret: '4HBVTqz5BOfcxLGFVOTBxBhnBgEVUEtJ_8sTkX6yGOyUNycyg5FV5KS0auSft1h5',
// //         audience: 'https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/'
// //       })
// //     };

// //     const response = await axios.request(options);
// //     return response.data.access_token; // Retorna o token de acesso
// //   } catch (error) {
// //     console.error("Erro ao obter o token:", error);
// //     throw error;
// //   }
// // }


// async function getToken() {
//   try {
//     const options = {
//       method: 'POST',
//       url: 'https://dev-d2d6navz25q1fi11.us.auth0.com/oauth/token',
//       headers: { 'content-type': 'application/x-www-form-urlencoded' },
//       data: new URLSearchParams({
//         grant_type: 'client_credentials',
//         client_id: 'aGD6eymjd0fmTs85NUi5R7eRpQmTGeKd',
//         client_secret: '4HBVTqz5BOfcxLGFVOTBxBhnBgEVUEtJ_8sTkX6yGOyUNycyg5FV5KS0auSft1h5',
//         audience: 'https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/',
//       }),
//     };

//     const response = await axios.request(options);
//     return response.data.access_token; // Retorna o token corretamente
//   } catch (error) {
//     console.error("Erro ao obter o token:", error.response?.data || error.message);
//     throw error;
//   }
// }

// async function fetchUsersByRole() {
//   try {
//     // Obtém o token
//     const TOKEN = await getToken();

//     // Configura os cabeçalhos
//     const myHeaders = new Headers();
//     myHeaders.append("Accept", "application/json");
//     myHeaders.append("Authorization", `Bearer ${TOKEN}`);

//     // Configura as opções da requisição
//     const requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow',
//     };

//     // Faz a requisição para obter os usuários
//     const response = await fetch("https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/roles/rol_v29cDvDN5h4xp7fK/users", requestOptions);

//     if (!response.ok) {
//       throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log(result); // Exibe os usuários associados ao papel
//   } catch (error) {
//     console.error("Erro ao buscar usuários pelo papel:", error.message);
//   }
// }

// // Executa a função principal
// fetchUsersByRole();



// // async function fetchUsersByRole() {
// //   

// //   try {
// //     axios.request(options).then(function (response) {
// //     console.log(response.data);
// //     const TOKEN = response.data;
// //   }).catch(function (error) {
// //     console.error(error);
// //   });

// //     const myHeaders = new Headers();
// //     myHeaders.append("Accept", "application/json");
// //     myHeaders.append("Authorization", `Bearer ${TOKEN}`);

// //     const requestOptions = {
// //       method: 'GET',
// //       headers: myHeaders,
// //       redirect: 'follow'
// //     };

// //     const response = await fetch("https://dev-d2d6navz25q1fi11.us.auth0.com/api/v2/roles/rol_v29cDvDN5h4xp7fK/users", requestOptions);
// //     const result = await response.json();
// //     console.log(result); // Exibe os usuários associados ao papel
// //   } catch (error) {
// //     console.error("Erro ao buscar usuários pelo papel:", error);
// //   }
// // }

// // // Executa a função principal
// // fetchUsersByRole();

