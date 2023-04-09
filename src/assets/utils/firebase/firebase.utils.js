import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCng6SMO0MjOjzqe4qsMUviwvdnZb0tjUc',
  authDomain: 'crwn-clothing-db-faf84.firebaseapp.com',
  projectId: 'crwn-clothing-db-faf84',
  storageBucket: 'crwn-clothing-db-faf84.appspot.com',
  messagingSenderId: '99560352212',
  appId: '1:99560352212:web:3263e9a6f481fd27ddce41',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey); // creates a collection ref
  const batch = writeBatch(db); // creates a writeBatch - kinda like a transaction reference

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase()); // creates a docRef
    batch.set(docRef, object); // writes the data from each collection to the writeBatch
  });
  await batch.commit(); // commits the writeBatch
  console.log('done writing batch to db');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log('error creating the user', err.message);
    }
  }
  return userSnapshot/* userDocRef */;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (callback) => {
  return await onAuthStateChanged(auth, callback);
};

// replaces Firebase listener for use in Promise based Sagas
// It checks to see if there is an active user that has been authenticated already
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
