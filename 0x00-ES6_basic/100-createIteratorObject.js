export default function createIteratorObject(report) {
  const arr = [];
  for (const item of Object.values(report.allEmployees)) {
    arr.push(...item);
  }

  return arr;
}
