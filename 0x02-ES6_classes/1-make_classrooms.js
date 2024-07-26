import ClassRoom from './0-classroom';

export default function initializeRooms() {
  const class0 = new ClassRoom(20);
  const class1 = new ClassRoom(23);
  const class2 = new ClassRoom(37);
  const myList = [class0, class1, class2];
  return (myList);
}
