import { auth, db } from './firebase';

const signIn = credentials => {
  auth.signInWithEmailAndPassword(credentials.email, credentials.password);
};

const signUp = newUser => {
  auth
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(resp =>
      db
        .collection('users')
        .doc(resp.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
          role: 'user',
        })
    );
};

const signOut = () => auth.signOut();

export { signIn, signOut, signUp };
