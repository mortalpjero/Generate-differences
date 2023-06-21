import _ from "lodash";

const sortObj = (obj) => {
  const sortedKeys = _.sortBy(Object.keys(obj));
  return sortedKeys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
};

export default sortObj;
