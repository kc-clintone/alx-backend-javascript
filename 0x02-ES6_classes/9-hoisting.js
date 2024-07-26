export class HolbertonClass {
  constructor(year, location) {
    this._year = year;
    this._location = location;
  }

  get year() {
    return this._year;
  }

  get location() {
    return this._location;
  }
}

export class StudentHolberton {
  constructor(firstName, lastName, holbertonClass) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._holbertonClass = holbertonClass;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  get holbertonClass() {
    return this._holbertonClass;
  }

  get fullStudentDescription() {
    return `${this._firstName} ${this._lastName} - ${this._holbertonClass.year} - ${this._holbertonClass.location}`;
  }
}
// classes
const class2019 = new HolbertonClass(2019, 'San Francisco');
const class2020 = new HolbertonClass(2020, 'San Francisco');
//students
const std0 = new StudentHolberton('Guillaume', 'Salva', class2020);
const std1 = new StudentHolberton('John', 'Doe', class2020);
const std2 = new StudentHolberton('Albert', 'Clinton', class2019);
const std3 = new StudentHolberton('Donald', 'Bush', class2019);
const std4 = new StudentHolberton('Jason', 'Sandler', class2019);

export default [std0, std1, std2, std3, std4];
