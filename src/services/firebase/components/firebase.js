/* eslint-disable no-unused-expressions */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { devConfig } from '../config/config';

!firebase.apps.length && firebase.initializeApp(devConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };
