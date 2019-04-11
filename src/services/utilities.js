import { firebase } from './firebase';

export const idToName = (param, collection) => {
  const string = collection.find(item => item.id === param);
  return string.name;
};

export const uidToName = (param, collection) => {
  const string = collection.find(item => item.uid === param);
  return string.name;
};

export const uidToId = (param, collection) => {
  const string = collection.find(item => item.uid === param);
  return string.id;
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

export const getPropertyById = (param, collection, property) => {
  const string = collection.find(item => item.id === param);
  return string[property];
};

export const updatePropertyInFirebase = (collection, uid, property, value) => {
  console.log(collection, uid, property, value);
  firebase.db
    .collection(collection)
    .doc(uid)
    .update({ [property]: value })
    .then(() => {
      console.log(collection, uid, property, value);
    });
};
