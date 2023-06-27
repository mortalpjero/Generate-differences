import parseFile from './parsers.js';
import construct from './construct.js';
import formatCase from './formatters/format.js';

const gendiff = (file1, file2, format = 'stylish') => {
  const fileFirstParsed = parseFile(file1);
  const fileSecondParsed = parseFile(file2);
  const constructTree = construct(fileFirstParsed, fileSecondParsed);
  return formatCase(constructTree, format);
};

export default gendiff;
