import stylish from './stylish.js';

const formatCase = (tree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }
  if (formatName === 'plain') {
    console.log('test');
  }

  return 'wrong format';
};

export default formatCase;
