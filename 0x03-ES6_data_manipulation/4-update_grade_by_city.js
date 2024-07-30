/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */

export default function updateStudentGradeByCity(list, city, newGrade) {
  return list
    .filter((k) => k.location === city)
    .map((std) => {
      newGrade.map((grd) => {
        if (grd.studentId === std.id) {
          std.grade = grd.grade;
        }
        if (!std.hasOwnProperty('grade')) {
          std.grade = 'N/A';
        }
        return std;
      });
      return std;
    });
}
