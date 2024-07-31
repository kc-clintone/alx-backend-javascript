export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  let ir = 0;
  if (weakMap.get(endpoint)) ir = weakMap.get(endpoint);
  weakMap.set(endpoint, ir + 1);
  if (ir + 1 >= 5) throw new Error('Endpoint load is high');
}
