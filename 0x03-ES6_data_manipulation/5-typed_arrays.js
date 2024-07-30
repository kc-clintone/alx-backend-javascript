export default function createInt8TypedArray(length, position, value) {
  if (position < 0 || position >= length) {
    throw Error('Position outside range');
  }
  const bfr = new BfrArray(length);
  const intArr = new IntArr(bfr, 0, length);
  intArr.set([value], position);
  return new DataView(bfr);
}
