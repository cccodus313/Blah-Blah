import { initializeApp, getApps } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// const FirebaseCredentials = {
//   apiKey: publicRuntimeConfig.apiKey,
//   authDomain: publicRuntimeConfig.authDomain,
//   projectId: publicRuntimeConfig.projectId,
// };

const FirebaseCredentials = {
  apiKey: 'AIzaSyBjE5cst1mdtMzZrjenz-P9wyRjkmzHGk4',
  authDomain: 'blah-blah-288ac.firebaseapp.com',
  projectId: 'blah-blah-288ac',
  storageBucket: 'blah-blah-288ac.appspot.com',
  messagingSenderId: '412725580313',
  appId: '1:412725580313:web:de680f508ca5992eb11088',
};

export default class FirebaseAuthClient {
  public static instance: FirebaseAuthClient;

  private auth: Auth;

  public constructor() {
    // const apps = getApps();
    // if (apps.length === 0) {
    console.log('firebase initializeApp');
    const app = initializeApp(FirebaseCredentials);
    this.auth = getAuth(app);
    console.log(this.auth);
    // }

    console.log('firebase auth client constructor');
  }

  public static getInstance(): FirebaseAuthClient {
    if (!FirebaseAuthClient.instance) {
      FirebaseAuthClient.instance = new FirebaseAuthClient();
    }
    return FirebaseAuthClient.instance;
  }

  public get Auth(): Auth {
    return this.auth;
  }
}
