export default function createInt8TypedArray(length, position, value) {
  if (position < 0 || position >= length) {
    throw Error('Position outside range');
  }
  const bfr = new ArrayBuffer(length);
  const intArr = new Int8Array(bfr, 0, length);
  intArr.set([value], position);
  return new DataView(bfr);
}
