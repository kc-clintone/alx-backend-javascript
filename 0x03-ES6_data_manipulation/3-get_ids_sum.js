export default function getStudentIdsSum(list) {
  return list.reduce((i, j) => i + j.id, 0);
}
