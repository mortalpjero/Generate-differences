import stylish from './stylish.js';

const formatCase = (tree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }

  throw new Error(`Wrong file format: ${formatName}. Supported formats: 'stylish'`);
};

export default formatCase;
