import genKeys from '../genKeys.js';
import sortObj from '../sortObj.js';

const stylish = (file1, file2) => {
  const spaceCount = 2;
  const replacer = ' ';
  const indent = replacer.repeat(spaceCount);
  const contents = [];
  const commonKeys = genKeys(file1, file2);
  const sortedCommonKeys = sortObj(commonKeys);

  Object.entries(sortedCommonKeys).forEach(([key, value]) => {
    if (value === 'deleted') {
      contents.push(`${indent}- ${key}: ${file1[key]}`);
    } else if (value === 'unchanged') {
      contents.push(`${indent}  ${key}: ${file1[key]}`);
    } else if (value === 'changed') {
      contents.push(`${indent}- ${key}: ${file1[key]}`);
      contents.push(`${indent}+ ${key}: ${file2[key]}`);
    } else if (value === 'added') {
      contents.push(`${indent}+ ${key}: ${file2[key]}`);
    }
  });
  contents.join(`${indent}\n`);

  return ['{', ...contents, '}'].join('\n');
};

export default stylish;
