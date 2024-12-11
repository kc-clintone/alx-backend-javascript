const express = require('express');

const app = express();
const port = 1245;

app.get('/', (_, res) => {
  res.send('Hello ALX!');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
