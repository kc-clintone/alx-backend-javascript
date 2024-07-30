export default function groceriesList() {
  const myList = new Map();
  const objects = {
    Apples: 10,
    Tomatoes: 10,
    Pasta: 1,
    Rice: 1,
    Banana: 5,
  };

  const list = Array.from(Object.keys(objects));
  list.map((item) => myList.set(item, objects[item]));
  return myList;
}
