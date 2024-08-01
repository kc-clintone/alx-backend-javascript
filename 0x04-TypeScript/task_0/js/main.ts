// Interface Student.

export interface Student {
  firstName: string,
  lastName: string,
  age: number,
  location: string,
}

// Creating two students

const student1: Student = {
  firstName: 'kaysee',
  lastName: 'clinton',
  age: 25,
  location: 'Kenya',
};

const student2: Student = {
  firstName: 'habiba',
  lastName: 'husein',
  age: 29,
  location: 'Kenya',
};

const studentsList: Array<Student> = [
  student1,
  student2,
];


export const myTable = (studentsList: Array<Student>): void =>  {
  const table = document.createElement('table');
  const headRow = document.createElement('tr');
  table.insertAdjacentElement('beforeend', headRow);
  headRow.insertAdjacentHTML('beforeend', '<th>FirstName</th>');
  headRow.insertAdjacentHTML('beforeend', '<th>Location</th>');

  for (const student of studentsList) {
    const studentRow = document.createElement('tr')
    studentRow.insertAdjacentHTML('beforeend', `<td>${student.firstName}</td>`);
    studentRow.insertAdjacentHTML('beforeend', `<td>${student.location}</td>`);
    table.insertAdjacentElement('beforeend', studentRow);
  }
  document.body.insertAdjacentElement('beforeend', table);
}

myTable(studentsList);
