/* eslint-disable no-unused-expressions */

import * as firebase from 'firebase';
import { devConfig } from '../config/config';

!firebase.apps.length && firebase.initializeApp(devConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };
