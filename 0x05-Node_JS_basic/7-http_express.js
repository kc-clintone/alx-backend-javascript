const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const dbFile = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Bezaleel Olakunori <https://github.com/B3zaleel>
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
        const dbFnames = fileLines[0].split(',');
        const studNames = dbFnames.slice(
          0,
          dbFnames.length - 1,
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
          const studEntries = studNames.map((propName, index) => [
            propName,
            studPropValues[index],
          ]);
          studGroups[myfield].push(Object.fromEntries(studEntries));
        }

        const totalStuds = Object.values(studGroups).reduce(
          (prev, curr) => (prev || []).length + curr.length,
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

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const resData = ['This is the list of our students'];

  countStudents(dbFile)
    .then((report) => {
      resData.push(report);
      const resTxt = resData.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', resTxt.length);
      res.statusCode = 200;
      res.write(Buffer.from(resTxt));
    })
    .catch((error) => {
      resData.push(error instanceof Error ? error.message : error.toString());
      const resTxt = resData.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', resTxt.length);
      res.statusCode = 200;
      res.write(Buffer.from(resTxt));
    });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

module.exports = app;
