const fs = require('fs');

/**
 * countStudents
 *
 * Reads a CSV file containing student information and logs the number
 * of students overall and in each field.
 * If the file cannot be loaded, it throws an error.
 *
 * @param {string} path - The path to the CSV file.
 * @throws Will throw an error if the file cannot be read.
 */
function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const lines = data
      .trim()
      .split('\n')
      .filter((line) => line !== '');

    const header = lines[0].split(','); // eslint-disable-line no-unused-vars
    const studentData = lines.slice(1);

    if (studentData.length === 0) {
      console.log('No students found in the database.');
      return;
    }

    console.log(`Number of students: ${studentData.length}`);

    const fieldGroups = {};

    studentData.forEach((line) => {
      /*eslint-disable-line no-unused-vars*/
      const [firstname, lastname, age, field] = line.split(',');
      /*eslint-disable-line no-unused-vars*/
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
