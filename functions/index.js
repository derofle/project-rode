const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const removeUID = doc => {
  delete doc.uid;
  return doc;
};

const getAvarageRating = array => {
  let sum = 0;
  const { length } = array;
  array.forEach(({ rating }) => (sum += rating));
  return Math.round(sum / length);
};

const updateAttraction = doc => {
  return admin
    .firestore()
    .collection('attractions')
    .doc(doc.uid)
    .update(removeUID(doc))
    .then(doc => console.log('attraction updated', doc));
};

exports.attractionUpdated = functions.firestore
  .document('attractions/{attractionUid}')
  .onUpdate((change, context) => {
    const doc = change.after.data();
    const uid = context.params.attractionUid;
    let ratingAvg = 0;
    if (doc.reviews) {
      ratingAvg = getAvarageRating(doc.reviews);
    }
    return updateAttraction({ ...doc, ratingAvg: ratingAvg, uid: uid });
  });

exports.attractionAdded = functions.firestore
  .document('attractions/{attractionUid}')
  .onCreate((doc, context) => {
    const docu = doc.data();
    const uid = context.params.attractionUid;
    let ratingAvg = 0;
    if (doc.reviews) {
      ratingAvg = getAvarageRating(doc.reviews);
    }
    return updateAttraction({ ...docu, ratingAvg: ratingAvg, uid: uid });
  });
