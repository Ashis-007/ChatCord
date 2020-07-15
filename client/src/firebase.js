import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "./config/firebaseConfig";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
  }

  async signin(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async signup(email, password, username) {
    try {
      return this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async changeDisplayName(username) {
    return this.auth.currentUser.updateProfile({
      displayName: username,
    });
  }

  isAuthenticated() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  async storeUser(uid, username, email) {
    try {
      await this.db.ref("users/" + uid).set({ uid, username, email });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser(uid) {
    const snapshot = await this.db.ref("/users/" + uid).once("value");
    return snapshot.val();
  }
}

export default new Firebase();
