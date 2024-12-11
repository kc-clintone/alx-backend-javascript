import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const databaseFile = process.argv[2];

    try {
      const students = await readDatabase(databaseFile);
      const report = ['This is the list of our students'];

      Object.keys(students).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).forEach((field) => {
        const list = students[field].join(', ');
        report.push(`Number of students in ${field}: ${students[field].length}. List: ${list}`);
      });

      res.status(200).send(report.join('\n'));
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const validMajors = ['CS', 'SWE'];
    const databaseFile = process.argv[2];

    if (!validMajors.includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase(databaseFile);
      if (!students[major]) {
        res.status(200).send(`No students in ${major}`);
      } else {
        const list = students[major].join(', ');
        res.status(200).send(`List: ${list}`);
      }
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;

