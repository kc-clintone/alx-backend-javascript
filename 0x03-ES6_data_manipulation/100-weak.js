export const myMap = new WeakMap();

export function queryAPI(endpoint) {
  let ir = 0;
  if (myMap.get(endpoint)) ir = myMap.get(endpoint);
  myMap.set(endpoint, ir + 1);
  if (ir + 1 >= 5) throw new Error('Endpoint load is high');
}
