'use client';
import Loader from '@/components/Loader';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { auth, firestore, provider } from '../../lib/firebase';
import { signInWithPopup } from "firebase/auth";
import { UserContext } from '@/lib/context';
import {
  doc,
  setDoc,
  updateDoc,
  runTransaction,
  collection,
  writeBatch
} from "firebase/firestore";
import debounce from 'lodash.debounce';


export default function EnterPage({ }) {
  const { user, username } = useContext(UserContext);

  console.log(user, username)
  return (
    <main>
      { user ?
          !username ? <UsernameForm /> : <SignOutButton />
          :
          <SignInButton />
      }
    </main>
  )

}

const SignInButton = () => {
  const signInWithGoogle = async () => {
    
    await signInWithPopup(auth, provider);
  }

  return (
    <button className='btn-google' onClick={signInWithGoogle}>
      <img src={'/google.png'} alt="" /> Sign in with Google
    </button>
  );
}

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}

const UsernameForm = (): any => {
  const [ formValue, setFormValue ] = useState('');
  const [ isValid, setIsValid ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const { user, username } = useContext(UserContext);

  const onChange = (e: { target: { value: string; }; }) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
  
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string | any[]) => {
      if (username.length >= 3) {
        const docRef = doc(firestore, `usernames/${username}`);;
        try {
          await runTransaction(firestore, async (transaction) => {
            const docExists = (await transaction.get(docRef)).exists();
            setIsValid(!docExists);
            setLoading(false);
          });
        } catch (err) {
          console.log(err)
        }
      }
    }, 500),
    []
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const batch = writeBatch(firestore);
    const userDocRef = doc(firestore, 'user', user.uid);
    const collectionRef = collection(firestore, 'usernames');
    
    try {
      await updateDoc(userDocRef, { username: formValue });
      await setDoc(doc(collectionRef, formValue), { uid: user.uid });
      await batch.commit();
    } catch (err) {
      console.log(err)
    }
  }

  function UsernameMessage({ username, isValid, loading }: any) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }

  return (
      (!username && <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>)
    );
}

