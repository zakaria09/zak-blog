import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useUserData() {
  const [ username, setUsername ] = useState<any>(null);
  const [ user, setUser ] = useState<any>(null);
  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const ref = collection(firestore ,'user');
      setDoc(doc(ref, user.uid), { 
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
      setUser(user);
      setUsername(null);
    } else {
      setUsername(null);
    }
  })

  return { user, username };
}

