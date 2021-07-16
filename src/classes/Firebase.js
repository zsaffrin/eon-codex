import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => ({ status: 'success', result: res }))
      .catch((err) => ({ status: 'error', result: err.message }));
  }

  logout() {
    this.auth.signOut();
  }

  getAllCollections() {
    return this.db.listCollections();
  }

  getCollection(collection, filter) {
    return filter ? (
      this.db
        .collection(collection)
        .where(filter[0],filter[1],filter[2])
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })))
        .catch((err) => console.error(err.message))      
    ) : (
      this.db
        .collection(collection)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })))
        .catch((err) => console.error(err.message))
    );
  }

  getDoc(collection, docId) {
    return this.db
      .collection(collection)
      .doc(docId)
      .get()
      .then((doc) => (doc.exists ? doc.data() : null))
      .catch((err) => console.error(err.message));
  }

  addDoc(collection, doc) {
    return this.db
      .collection(collection)
      .add({
        ...doc,
        createdDate: new Date(),
        lastModifiedDate: new Date(),
      })
      .then((res) => ({ status: 'success', result: res }))
      .catch((err) => ({ status: 'error', result: err.message }));
  }

  setDoc(collection, id, doc) {
    return this.db
      .collection(collection)
      .doc(id)
      .set({
        ...doc,
        createdDate: new Date(),
        lastModifiedDate: new Date(),
      })
      .then((res) => ({ status: 'success', result: res }))
      .catch((err) => ({ status: 'error', result: err.message }));
  }

  updateDoc(query, value) {
    const { id, exists, ...rest } = value;
    return this.db
      .doc(query)
      .update({
        ...rest,
        lastModifiedDate: new Date(),
      })
      .then((res) => ({ status: 'success', result: res }))
      .catch((err) => ({ status: 'error', result: err.message }));
  }

  deleteDoc(query) {
    return this.db
      .doc(query)
      .delete()
      .then((res) => ({ status: 'success', result: res }))
      .catch((err) => ({ status: 'error', result: err.message }));
  }
}

export default new Firebase();
