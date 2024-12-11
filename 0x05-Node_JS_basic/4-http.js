const http = require('http');

const port = 1245;
const host = 'localhost';
const app = http.createServer();

app.on('request', (_, res) => {
  const responseText = 'Hello ALX!';

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);
  res.statusCode = 200;
  res.write(Buffer.from(responseText));
});

app.listen(port, host, () => {
  process.stdout.write(`Server running on port -> http://${host}:${port}\n`);
});

module.exports = app;
