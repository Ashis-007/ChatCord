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

  signin(email, password) {
    try {
      return this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  signup(email, password) {
    try {
      return this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  changeDisplayName(username) {
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
