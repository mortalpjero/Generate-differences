const getKey = (node) => node.key;
const getType = (node) => node.type;
const getValue = (node) => {
  const type = getType(node);
  if (type === 'added' || type === 'deleted' || type === 'unchanged') {
    return node.value;
  }
  if (type === 'changed') {
    return [node.from, node.to];
  }
  return node.children;
};

export { getKey, getType, getValue };
