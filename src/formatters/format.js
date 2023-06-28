import stylish from './stylish.js';
import plain from './plain.js';

const formatCase = (tree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }

  if (formatName === 'plain') {
    return plain(tree);
  }
  throw new Error(`Wrong file format: ${formatName}. Supported formats: 'stylish'`);
};

export default formatCase;
