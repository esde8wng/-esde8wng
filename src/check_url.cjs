const https = require('https');
https.get('https://www.lapor.go.id/themes/lapor/assets/images/logo.png', (res) => {
  console.log('Status code:', res.statusCode);
}).on('error', (e) => {
  console.error(e);
});
