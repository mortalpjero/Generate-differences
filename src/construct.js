import _ from 'lodash';

// This code is comparing two objects and makes a tree of results.
// The item of this tree has 'key', 'type', 'value'.
// If the 'value' is not equal to 'nested', that means, that it is a leaf of

const construct = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortedValues = _.sortBy(uniqueKeys);

  const result = sortedValues.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    if (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'changed',
        from: obj1[key],
        to: obj2[key],
      };
    }
    return { key, type: 'nested', children: construct(obj1[key], obj2[key]) };
  });

  return result;
};

export default construct;
