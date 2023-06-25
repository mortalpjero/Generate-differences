import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';

const gendiff = (file1, file2, format = 'stylish') => {
  const fileFirstParsed = parseFile(file1);
  const fileSecondParsed = parseFile(file2);

  if (format === 'stylish') {
    return stylish(fileFirstParsed, fileSecondParsed);
  }

  return null;
};

export default gendiff;
