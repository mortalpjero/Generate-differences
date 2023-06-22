import YAML from 'js-yaml';
import readFile from './readFile.js';

const parseFile = (file) => {
  const fileContent = readFile(file);
  const extension = file.split('.').pop();
  let result = {};
  if (extension === 'json') {
    result = JSON.parse(fileContent);
  }
  if (extension === 'yaml' || extension === 'yml') {
    result = YAML.load(fileContent);
  }

  return result;
};

export default parseFile;
