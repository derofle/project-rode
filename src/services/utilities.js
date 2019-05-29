import { firebase } from './firebase';

// Functions used only in this file.
const removeUID = doc => {
  delete doc.uid;
  return doc;
};

// Helper Functions
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

// Data Handling
// TODO: Add errortrappers to add functions
// TODO: Make add and update global

// General Handling
export const deleteDoc = (collection, doc) =>
  firebase.db
    .collection(collection)
    .doc(doc)
    .delete()
    .then(error => {
      if (error) {
        return false;
      }
      return true;
    });

// Park Handling
export const addPark = async doc =>
  firebase.db
    .collection('parks')
    .add(doc)
    .then(ref => ref.id);

export const updatePark = async doc =>
  firebase.db
    .collection('parks')
    .doc(doc.uid)
    .update(removeUID(doc))
    .then(error => {
      if (error) {
        return false;
      }
      return true;
    });

// Attraction Handling
export const addAttraction = async doc =>
  firebase.db
    .collection('attractions')
    .add(doc)
    .then(ref => ref.id);

export const updateAttraction = async doc =>
  firebase.db
    .collection('attractions')
    .doc(doc.uid)
    .update(removeUID(doc))
    .then(error => {
      if (error) {
        return false;
      }
      return true;
    });

// License Handling
export const addLicense = async doc =>
  firebase.db
    .collection('mediaLicenses')
    .add(doc)
    .then(ref => ref.id);

export const updateLicense = async doc =>
  firebase.db
    .collection('mediaLicenses')
    .doc(doc.uid)
    .update(removeUID(doc))
    .then(error => {
      if (error) {
        return false;
      }
      return true;
    });

// Category Handling
export const updateCategory = async doc =>
  firebase.db
    .collection('attractionCategories')
    .doc(doc.uid)
    .update(removeUID(doc))
    .then(error => {
      if (error) {
        return false;
      }
      return true;
    });

// Type Handling
export const addType = async doc =>
  firebase.db
    .collection('attractionTypes')
    .add(doc)
    .then(ref => ref.id);

export const updateType = async doc =>
  firebase.db
    .collection('attractionTypes')
    .doc(doc.uid)
    .update(removeUID(doc))
    .then(error => {
      if (error) {
        return false;
      }
      return true;
    });

// Property retrieving

export const getCountryId = (param, collection) => {
  const string = collection.find(item => item.uid === param);
  return string.country;
};

export const getProperty = (arg, type, prop, collection) => {
  const property = collection.find(item => item[type] === arg);
  if (property[prop]) {
    return property[prop];
  }
  return null;
};

export const addFavorite = async doc =>
  firebase.db
    .collection('users')
    .doc(doc.uid)
    .update(removeUID(doc))
    .then(error => {
      if (error) {
        return false;
      }
      return true;
    });

export const sortArray = (array, property, direction) => {
  if (direction === 'desc') {
    const sortedArray = array.sort((a, b) =>
      // eslint-disable-next-line no-nested-ternary
      a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
    );
    console.log(sortedArray);
    return sortedArray;
  }
  if (direction === 'asc') {
    const sortedArray = array.sort((a, b) =>
      // eslint-disable-next-line no-nested-ternary
      a[property] < b[property] ? 1 : b[property] < a[property] ? -1 : 0
    );
    return sortedArray;
  }
  return null;
};

export const getAvarageRating = array => {
  let sum = 0;
  const { length } = array;
  array.forEach(({ rating }) => (sum += rating));
  return Math.round(sum / length);
};
