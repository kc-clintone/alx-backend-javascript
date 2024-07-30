export default function getStudentsByLocation(list, city) {
  return list.filter((k) => k.location === city);
}
