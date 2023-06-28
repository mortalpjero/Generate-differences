import _ from 'lodash';
import { getKey, getValue, getType } from '../utils.js';

// Stringify function is returning the value if it is not an object.
// If the value is an object, it uses recursive calls to process it.

const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const replacer = ' ';
    const spaceCount = 4;
    const indent = replacer.repeat(depth * spaceCount);
    const bracketIndent = replacer.repeat((depth - 1) * spaceCount);
    const lines = Object.entries(currentValue).map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, currentDepth);
};

// stylish function takes our previously constructed tree
// and processes it, to give it right iteration and build a desired output tree.
// The indentation is calculated by keeping track of depth of the tree.

const stylish = (construct) => {
  const iter = (currentValue, depth) => {
    const replacer = ' ';
    const spaceCountIter = 4;
    const indent = replacer.repeat((depth * spaceCountIter) - 2);
    const bracketIndent = replacer.repeat(spaceCountIter * (depth - 1));

    const content = currentValue.map((constructed) => {
      const [key, type, value] = [getKey(constructed), getType(constructed), getValue(constructed)];
      // If the types are simple,such as 'added', 'deleted', 'changed' or 'unchenged'.
      // the output is added to the final tree.
      // If the output is complex (the value of a key has multiple values in it)
      // the Iter function is recursively called.
      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${key}: ${stringify(value[0], depth + 1)}`,
            `${indent}+ ${key}: ${stringify(value[1], depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${indent}  ${key}: ${iter(value, depth + 1)}`;
        default:
          return null;
      }
    });

    return ['{', ...content, `${bracketIndent}}`].join('\n');
  };

  return iter(construct, 1);
};

export default stylish;
