const isObject = (value) => {
  const result = typeof value === 'object' && value !== null;
  return result;
};

export default isObject;
