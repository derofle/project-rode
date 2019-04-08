export const idToName = (param, collection) => {
  const string = collection.find(item => item.id === param).name;
  return string;
};
