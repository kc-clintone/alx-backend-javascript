const http = require('http');
const fs = require('fs');

const port = 1245;
const host = 'localhost';
const app = http.createServer();
const database_file = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Clinton Otieno - www.github.com/kc-clintone
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reports = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studGroups = {};
        const dbfnames = fileLines[0].split(',');
        const studNames = dbfnames.slice(
          0,
          dbfnames.length - 1,
        );

        for (const line of fileLines.slice(1)) {
          const studRecord = line.split(',');
          const studPropValues = studRecord.slice(
            0,
            studRecord.length - 1,
          );
          const myfield = studRecord[studRecord.length - 1];
          if (!Object.keys(studGroups).includes(myfield)) {
            studGroups[myfield] = [];
          }
          const studEntries = studPropNames.map((propName, index) => [
            propName,
            studPropValues[index],
          ]);
          studGroups[myfield].push(Object.fromEntries(studEntries));
        }

        const totalStuds = Object.values(studGroups).reduce(
          (last, current) => (lsat || []).length + current.length,
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
      }
    });
  }
});

const handleServerRoutes = [
  {
    route: '/',
    handler(_, res) {
      const myResponse = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', myResponse.length);
      res.statusCode = 200;
      res.write(Buffer.from(myResponse));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const resps = ['This is the list of our students'];

      countStudents(database_file)
        .then((report) => {
          resps.push(report);
          const myResponse = resps.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', myResponse.length);
          res.statusCode = 200;
          res.write(Buffer.from(myResponse));
        })
        .catch((error) => {
          resps.push(error instanceof Error ? error.message : error.toString());
          const myResponse = resps.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', myResponse.length);
          res.statusCode = 200;
          res.write(Buffer.from(myResponse));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const handleRoutes of handleServerRoutes) {
    if (handleRoutes.route === req.url) {
      handleRoutes.handler(req, res);
      break;
    }
  }
});

app.listen(port, host, () => {
  process.stdout.write(`Server listening at -> http://${host}:${port}\n`);
});

module.exports = app;
