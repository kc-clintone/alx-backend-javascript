/* eslint-disable array-callback-return */
export default function hasValuesFromArray(set, list) {
  let rule = true;
  list.map((data) => {
    if (!set.has(data)) {
      rule = false;
    }
  });

  return rule;
}
