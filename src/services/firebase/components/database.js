import { db } from './firebase';

const getCollectionData = collection =>
  db
    .collection(collection)
    .get()
    .then(querySnapshot => {
      let dataArray = [];
      querySnapshot.forEach(doc => {
        dataArray = [...dataArray, { ...doc.data(), uid: doc.id }];
      });
      return dataArray;
    });

export { getCollectionData };
