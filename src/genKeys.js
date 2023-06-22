import _ from 'lodash';

const genKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueKeys = _.union(keys1, keys2);
  const result = uniqueKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc[key] = 'added';
    } else if (!Object.hasOwn(obj2, key)) {
      acc[key] = 'deleted';
    } else if (obj1[key] !== obj2[key]) {
      acc[key] = 'changed';
    } else {
      acc[key] = 'unchanged';
    }

    return acc;
  }, {});

  return result;
};

export default genKeys;
