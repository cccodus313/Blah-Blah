import FirebaseAuthClient from '@/models/firebase_client';
import { InAuthUser } from '@/models/in_auth_user';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: User | null) => {
    console.log({ authStateChanged: authState });
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setAuthUser({
      uid: authState.uid,
      email: authState.email,
      photoURL: authState.photoURL,
      displayName: authState.displayName,
    });
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const signInResult = await signInWithPopup(FirebaseAuthClient.getInstance().Auth, provider);

      if (signInResult.user) {
        console.log(signInResult.user);
        const resp = await fetch('/api/members.add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: signInResult.user.uid,
            email: signInResult.user.email,
            displayName: signInResult.user.displayName,
            photoURL: signInResult.user.photoURL,
          }),
        });
        console.info({ status: resp.status });
        const respData = await resp.json();
        console.info(respData);
      }
    } catch (err) {
      console.error(err);
    }
  }
  const signOut = () => FirebaseAuthClient.getInstance().Auth.signOut().then(clear);
  useEffect(() => {
    const unsubscribe = FirebaseAuthClient.getInstance().Auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
}
