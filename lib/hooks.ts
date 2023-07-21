import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useUserData() {
  const [ username, setUsername ] = useState<any>(null);
  const [ user, setUser ] = useState<any>(null);
  
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (!user) return; 
    console.log('running..')
    const docRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return setUser(user);
    const ref = collection(firestore ,'users');
    setDoc(doc(ref, user.uid), { 
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName
    });
    setUser(user);
  });

  useEffect(() => {
    let unsubscribe;
    const getUser = async () => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        unsubscribe = onSnapshot(docRef, (doc) => {
          const { username } = doc.data() as any;
          setUsername(username);
        });
      }
    };

    getUser();

    return unsubscribe;
  }, [user]);

  return { user, username };
}

