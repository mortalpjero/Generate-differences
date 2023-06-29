import _ from 'lodash';
import YAML from 'js-yaml';
import readFile from './readFile.js';

const parseFile = (file) => {
  const fileContent = readFile(file);
  const splitted = file.split('.');
  const extension = _.last(splitted);
  if (extension === 'json') {
    return JSON.parse(fileContent);
  }
  if (extension === 'yaml' || extension === 'yml') {
    return YAML.load(fileContent);
  }

  throw new Error(`Wrong file extension: '${extension}'. Supported formats: 'JSON', 'YAML', 'YML'`);
};

export default parseFile;
