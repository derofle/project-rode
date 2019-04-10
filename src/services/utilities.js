export const idToName = (param, collection) => {
  const string = collection.find(item => item.id === param);
  return string.name;
};

export const idToSlug = (param, collection) => {
  const string = collection.find(item => item.id === param).slug;
  return string;
};

export const getCategoryIdByTypeId = (param, types, categories) => {
  const type = types.find(obj => obj.id === param);
  const category = categories.find(obj => type.categoryId === obj.id);
  return category.id;
};
