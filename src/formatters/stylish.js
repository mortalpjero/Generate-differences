import _ from 'lodash';
import { getKey, getValue, getType } from '../utils.js';

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

const stylish = (construct) => {
  const iter = (currentValue, depth) => {
    const replacer = ' ';
    const spaceCountIter = 4;
    const indent = replacer.repeat((depth * spaceCountIter) - 2);
    const bracketIndent = replacer.repeat(spaceCountIter * (depth - 1));

    const content = currentValue.map((constructed) => {
      const [key, type, value] = [getKey(constructed), getType(constructed), getValue(constructed)];
      if (type === 'added') {
        return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
      } if (type === 'deleted') {
        return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
      } if (type === 'unchanged') {
        return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
      } if (type === 'changed') {
        return [
          `${indent}- ${key}: ${stringify(value[0], depth + 1)}`,
          `${indent}+ ${key}: ${stringify(value[1], depth + 1)}`,
        ].join('\n');
      } if (type === 'nested') {
        return `${indent}  ${key}: ${iter(value, depth + 1)}`;
      }
      return null;
    });
    return ['{', ...content, `${bracketIndent}}`].join('\n');
  };
  return iter(construct, 1);
};

export default stylish;
