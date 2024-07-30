export default function getListStudentIds(list) {
  if (Array.isArray(list)) {
    return list.map((k) => k.id);
  }
  return [];
}
