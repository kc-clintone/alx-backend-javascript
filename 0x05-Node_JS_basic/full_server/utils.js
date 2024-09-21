import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const fields = {};
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        const fieldIndex = headers.indexOf('field');
        const nameIndex = headers.indexOf('firstname');

        if (fieldIndex === -1 || nameIndex === -1) {
          reject(new Error('Invalid database format'));
          return;
        }

        for (const line of lines.slice(1)) {
          const student = line.split(',');
          const field = student[fieldIndex];
          const name = student[nameIndex];

          if (field && name) {
            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(name);
          }
        }

        resolve(fields);
      }
    });
  });
}

export default readDatabase;
