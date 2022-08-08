import { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, deleteDoc, doc, collection, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => ({ status: 'success', result: res }))
    .catch((err) => ({ status: 'error', result: err.message }));
};

const logout = () => {
  return signOut(auth);
};

const addDocument = async (collectionId, data) => {
  const now = new Date();
  return addDoc(collection(db, collectionId), {
    ...data,
    createdDate: now,
    lastModifiedDate: now,
  });
};

const setDocument = async (collectionId, docId, data) => {
  const now = new Date();
  return setDoc(doc(db, collectionId, docId), {
    createdDate: now,
    ...data,
    lastModifiedDate: now,
  });
};

const updateDocument = async (collectionId, docId, data) => {
  return updateDoc(doc(db, collectionId, docId), {
    ...data,
    lastModifiedDate: new Date(),
  });
};

const deleteDocument = async (collectionId, docId) => {
  return deleteDoc(doc(db, collectionId, docId));
};

const firebase = {
  auth,
  db,
  login,
  logout,
  addDocument,
  setDocument,
  deleteDocument,
  updateDocument,
};

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
