import _ from "lodash";
import { JSONparse } from './parsers.js';
import getFile from './getFile.js';
import sortObj from './sortObj.js';
import genKeys from './genKeys.js';

const getdiff = (file1, file2) => {
  let spaceCount = 2;
  const replacer = ' ';
  const indent = replacer.repeat(spaceCount);

  const fileFirstContent = getFile(file1);
  const fileSecondContent = getFile(file2);

  const fileFirstParsed = JSONparse(fileFirstContent);
  const fileSecondParsed = JSONparse(fileSecondContent);

  const commonKeys = genKeys(fileFirstParsed, fileSecondParsed);
  const sortedCommonKeys = sortObj(commonKeys);

  const contents = [];
  for (const [key, value] of Object.entries(sortedCommonKeys)) {
    if (value === "deleted") {
      contents.push(`${indent}- ${key}: ${fileFirstParsed[key]}`);
    } else if (value === "unchanged") {
      contents.push(`${indent}  ${key}: ${fileFirstParsed[key]}`);
    } else if (value === "changed") {
      contents.push(`${indent}- ${key}: ${fileFirstParsed[key]}`);
      contents.push(`${indent}+ ${key}: ${fileSecondParsed[key]}`);
    } else if (value === "added") {
      contents.push(`${indent}+ ${key}: ${fileSecondParsed[key]}`);
    }
  }

  contents.join(`${indent}\n`);

  return [
    '{',
    ...contents,
    `}`,
  ].join('\n');
};

export default getdiff;