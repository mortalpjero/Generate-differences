import _ from 'lodash';
import { getKey, getValue, getType } from '../utils.js';

// Stringify is checking for the type of data.
// If the type of data is an Object, the '[complex value]' is going to be returned.
// If it is the string '' signs need to be added to match the wanted result.

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

// Here the types are checked, so that the lines can be formed correctly.
// The recursive process is used, if the value contains more than 1 option in it.
// The parent is passed on in this recursive call, to compile paths for the desired output.

const plain = (construct, parent = '') => {
  const lines = construct.map((item) => {
    const [key, type, value] = [getKey(item), getType(item), getValue(item)];
    switch (type) {
      case 'added':
        return `Property '${parent}${key}' was added with value: ${stringify(value)}`;
      case 'deleted':
        return `Property '${parent}${key}' was removed`;
      case 'changed':
        return `Property '${parent}${key}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`;
      case 'nested':
        return plain(value, `${parent + key}.`);
      default:
        return '';
    }
  });

  return lines.filter((line) => line !== '').join('\n'); // If the values are not empty, they are joined with the line break
};

export default plain;
