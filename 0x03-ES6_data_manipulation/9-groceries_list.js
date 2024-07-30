export default function groceriesList() {
  const myList = new Map();
  const objects = {
    Pen: 10,
    Paper: 10,
    Clips: 1,
    Bands: 1,
    Tape: 5,
  };

  const list = Array.from(Object.keys(objects));
  list.map((item) => myList.set(item, objects[item]));
  return myList;
}
