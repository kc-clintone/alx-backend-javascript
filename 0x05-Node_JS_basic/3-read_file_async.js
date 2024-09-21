const fs = require('fs').promises;

/**
 * countStudents
 *
 * Reads a CSV file containing student information asynchronously and
 * logs the number of students overall and in each field.
 * If the file cannot be loaded, it rejects with an error.
 *
 * @param {string} path - The path to the CSV file.
 * @returns {Promise<void>} - A promise that resolves when the operation
 * completes.
 * @author Clinton Otieno - www.github.com/kc-clintone
 */
function countStudents(path) {
  return fs
    .readFile(path, 'utf8')
    .then((data) => {
      const lines = data
        .trim()
        .split('\n')
        .filter((line) => line !== '');

      const header = lines[0].split(',');
      const studentData = lines.slice(1);

      if (studentData.length === 0) {
        console.log('No students found in the database.');
        return;
      }

      console.log(`Number of students: ${studentData.length}`);

      const fieldGroups = {};

      studentData.forEach((line) => {
        const [firstname, lastname, age, field] = line.split(',');

        if (field in fieldGroups) {
          fieldGroups[field].push(firstname);
        } else {
          fieldGroups[field] = [firstname];
        }
      });

      for (const [field, students] of Object.entries(fieldGroups)) {
        console.log(
          `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
        );
      }
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
