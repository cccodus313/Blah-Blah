import { getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

const FirebaseCredentials = {
  apiKey: 'AIzaSyBjE5cst1mdtMzZrjenz-P9wyRjkmzHGk4',
  authDomain: 'blah-blah-288ac.firebaseapp.com',
  projectId: 'blah-blah-288ac',
};

export default class FirebaseClient {
  private static instance: FirebaseClient;

  private auth: Auth;

  public constructor() {
    const apps = getApps();
    if (apps.length === 0) {
      console.info('firebase client init start');
      initializeApp(FirebaseCredentials);
    }
    this.auth = getAuth();
    console.info('firebase auth');
  }

  public static getInstance(): FirebaseClient {
    if (FirebaseClient.instance === undefined || FirebaseClient.instance === null) {
      FirebaseClient.instance = new FirebaseClient();
    }
    return FirebaseClient.instance;
  }

  public get Auth(): Auth {
    return this.auth;
  }
}
