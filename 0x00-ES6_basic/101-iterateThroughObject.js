/* eslint-disable radix */
export default function iterateThroughObject(reportWithIterator) {
  let data = '';

  for (const [index, item] of Object.entries(reportWithIterator)) {
    data += `${item}`;

    if (parseInt(index) !== reportWithIterator.length - 1) {
      data += ' | ';
    }
  }

  return data;
}
