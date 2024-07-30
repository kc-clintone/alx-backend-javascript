/* eslint-disable array-callback-return */
export default function cleanSet(set, string) {
  if (string === undefined || string.length === 0) {
    return '';
  }

  return [...set]
    .filter((index) => (index !== undefined ? index.startsWith(string) : ''))
    .map((index) => (index !== undefined ? index.slice(string.length) : ''))
    .join('-');
}
