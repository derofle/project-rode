/* eslint-disable no-unused-expressions */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { devConfig } from '../config/config';

!firebase.apps.length && firebase.initializeApp(devConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { auth, db, storage };
