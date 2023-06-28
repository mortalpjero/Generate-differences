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
    const indent = replacer.repeat(depth * spaceCountIter - 2);
    const bracketIndent = replacer.repeat((depth - 1) * spaceCountIter);

    const content = currentValue.map((constructed) => {
      const [key, type, value] = [getKey(constructed), getType(constructed), getValue(constructed)];
      const valueString = stringify(value, depth + 1);

      if (type === 'added') {
        return `${indent}+ ${key}: ${valueString}`;
      }
      if (type === 'deleted') {
        return `${indent}- ${key}: ${valueString}`;
      }
      if (type === 'unchanged') {
        return `${indent}  ${key}: ${valueString}`;
      }
      if (type === 'changed') {
        const [oldValue, newValue] = value;
        return `${indent}- ${key}: ${stringify(oldValue, depth + 1)}\n${indent}+ ${key}: ${stringify(newValue, depth + 1)}`;
      }
      if (type === 'nested') {
        return `${indent}  ${key}: ${iter(value, depth + 1)}`;
      }

      return null;
    });

    return ['{', ...content, `${bracketIndent}}`].join('\n');
  };

  return iter(construct, 1);
};

export default stylish;
