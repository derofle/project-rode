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

const watchCollectionData = collection =>
  db.collection(collection).onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'added') {
        console.log('New attraction: ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified attraction: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed attraction: ', change.doc.data());
      }
    });
  });

export { getCollectionData, watchCollectionData };
