import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-UrQ-fXWu3OcldY0xU8MU8-ztFYYe46c",
  authDomain: "eon-codex-23d99.firebaseapp.com",
  databaseURL: "https://eon-codex-23d99.firebaseio.com",
  projectId: "eon-codex-23d99",
  storageBucket: "eon-codex-23d99.appspot.com",
  messagingSenderId: "156955843402",
  appId: "1:156955843402:web:10f4a8824adb6c00"
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
      .then(res => ({ status: "success", result: res }))
      .catch(err => ({ status: "error", result: err.message }));
  }

  logout() {
    this.auth.signOut();
  }

  addDoc(collection, doc) {
    return this.db
      .collection(collection)
      .add(doc)
      .then(res => ({ status: "success", result: res }))
      .catch(err => ({ status: "error", result: err.message }));
  }

  updateDoc(query, value) {
    return this.db
      .doc(query)
      .update(value)
      .then(res => ({ status: "success", result: res }))
      .catch(err => ({ status: "error", result: err.message }));
  }

  deleteDoc(query) {
    return this.db
      .doc(query)
      .delete()
      .then(res => ({ status: "success", result: res }))
      .catch(err => ({ status: "error", result: err.message }));
  }
}

export default new Firebase();
