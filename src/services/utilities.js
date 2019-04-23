import { firebase } from './firebase';

export const idToName = (param, collection) => {
  const string = collection.find(item => item.id === param);
  return string.name;
};

export const uidToName = (param, collection) => {
  console.log(param, collection);
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

export const uidToSlug = (param, collection) => {
  console.log(param, collection);
  const string = collection.find(item => item.uid === param).slug;
  return string;
};

export const getCategoryUidByTypeId = (param, types, categories) => {
  const type = types.find(obj => obj.uid === param);
  const category = categories.find(obj => type.category === obj.uid);
  return category.uid;
};

export const getPropertyByUid = (param, collection, property) => {
  const string = collection.find(item => item.uid === param);
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

export const updateDocInFirebase = (collection, uid, object) => {
  console.log(collection, uid, object);
  firebase.db
    .collection(collection)
    .doc(uid)
    .update(object)
    .then(() => {
      console.log(collection, uid);
    });
};

export const createDocInFirebase = (collection, object) => {
  firebase.db.collection(collection).add(object);
};

export const deleteDocInFirebase = (collection, doc) => {
  firebase.db
    .collection(collection)
    .doc(doc)
    .delete();
};
