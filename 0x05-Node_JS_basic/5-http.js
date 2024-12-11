const http = require('http');
const fs = require('fs');

const port = 1245;
const host = 'localhost';
const app = http.createServer();
const databaseFile = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counting the students in a CSV file.
 * @param {String} dataPath --- The path to the CSV  file.
 * @author Clinton Otieno
*/
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    return reject(new Error('Cannot load the database'));
  }

  fs.readFile(dataPath, (error, data) => {
    if (error) {
      return reject(new Error('Cannot load the database'));
    }

    const reports = [];
    const fileLines = data.toString('utf-8').trim().split('\n');
    const studGroups = {};
    const dbfnames = fileLines[0].split(',');
    const studNames = dbfnames.slice(0, dbfnames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studRecord = line.split(',');
      const studPropValues = studRecord.slice(0, studRecord.length - 1);
      const myfield = studRecord[studRecord.length - 1];
      if (!Object.keys(studGroups).includes(myfield)) {
        studGroups[myfield] = [];
      }
      const studEntries = studNames.map((propName, index) => [
        propName,
        studPropValues[index],
      ]);
      studGroups[myfield].push(Object.fromEntries(studEntries));
    }

    const totalStuds = Object.values(studGroups).reduce(
      (total, group) => total + group.length,
      0
    );
    reports.push(`Number of students: ${totalStuds}`);
    for (const [myfield, group] of Object.entries(studGroups)) {
      reports.push([
        `Number of students in ${myfield}: ${group.length}.`,
        'List:',
        group.map((student) => student.firstname).join(', '),
      ].join(' '));
    }
    resolve(reports.join('\n'));
  });
});

const handleServerRoutes = [
  {
    route: '/',
    handler(_, res) {
      const myResponse = 'Hello ALX!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(myResponse));
      res.statusCode = 200;
      res.write(Buffer.from(myResponse));
      res.end();
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const resps = ['This is the list of our students'];

      countStudents(databaseFile)
        .then((report) => {
          resps.push(report);
          const myResponse = resps.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', Buffer.byteLength(myResponse));
          res.statusCode = 200;
          res.write(Buffer.from(myResponse));
          res.end();
        })
        .catch((error) => {
          resps.push(error instanceof Error ? error.message : error.toString());
          const myResponse = resps.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', Buffer.byteLength(myResponse));
          res.statusCode = 200;
          res.write(Buffer.from(myResponse));
          res.end();
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const handleRoutes of handleServerRoutes) {
    if (handleRoutes.route === req.url) {
      handleRoutes.handler(req, res);
      return;
    }
  }

  res.statusCode = 404;
  const notFoundMessage = '404 Not Found';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(notFoundMessage));
  res.write(Buffer.from(notFoundMessage));
  res.end();
});

app.listen(port, host, () => {
  process.stdout.write(`Server running on port -> http://${host}:${port}\n`);
});

module.exports = app;
