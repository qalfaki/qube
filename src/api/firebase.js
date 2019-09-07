// Firebase SDK
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAhT5eqvEaZmQ1hqDtHOK9NGWvBuGi5Mjg",
  authDomain: "qube-d0bc0.firebaseapp.com",
  databaseURL: "https://qube-d0bc0.firebaseio.com",
  projectId: "qube-d0bc0",
  storageBucket: "qube-d0bc0.appspot.com",
  messagingSenderId: "265147479362",
  appId: "1:265147479362:web:eac78e340b31b0c1"
};


class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  // *** Auth API ***

  signUp = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** upload Image API *** //

  upload = (uid, file)=> {
    let storageRef = this.storage.ref(`${uid}/profilePicture/${file.name}`);
    return storageRef.put(file, {contentType: file.type})
  }

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');


  // *** TODO lists API ***

  todoList = () => this.db.ref(`todoLists`);

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

}

export default Firebase