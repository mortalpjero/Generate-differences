import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatCase = (tree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }

  if (formatName === 'plain') {
    return plain(tree);
  }

  if (formatName === 'json') {
    return json(tree);
  }
  throw new Error(`Wrong file format: ${formatName}. Supported formats: 'stylish', 'plain', 'json'`);
};

export default formatCase;
