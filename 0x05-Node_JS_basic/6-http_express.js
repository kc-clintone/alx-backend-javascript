const express = require('express');

const app = express();
const port = 1245;

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

module.exports = app;
