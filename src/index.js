import parseFile from './parsers.js';
import sortObj from './sortObj.js';
import genKeys from './genKeys.js';

const gendiff = (file1, file2) => {
  const spaceCount = 2;
  const replacer = ' ';
  const indent = replacer.repeat(spaceCount);

  const fileFirstParsed = parseFile(file1);
  const fileSecondParsed = parseFile(file2);

  const commonKeys = genKeys(fileFirstParsed, fileSecondParsed);
  const sortedCommonKeys = sortObj(commonKeys);

  const contents = [];
  Object.entries(sortedCommonKeys).forEach(([key, value]) => {
    if (value === 'deleted') {
      contents.push(`${indent}- ${key}: ${fileFirstParsed[key]}`);
    } else if (value === 'unchanged') {
      contents.push(`${indent}  ${key}: ${fileFirstParsed[key]}`);
    } else if (value === 'changed') {
      contents.push(`${indent}- ${key}: ${fileFirstParsed[key]}`);
      contents.push(`${indent}+ ${key}: ${fileSecondParsed[key]}`);
    } else if (value === 'added') {
      contents.push(`${indent}+ ${key}: ${fileSecondParsed[key]}`);
    }
  });
  contents.join(`${indent}\n`);

  return ['{', ...contents, '}'].join('\n');
};

export default gendiff;
