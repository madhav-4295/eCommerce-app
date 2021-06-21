import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { fireBaseConfig } from "./config";

//connect to firebase database
firebase.initializeApp(fireBaseConfig);

//creating instance of auth and firestore
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// custom provider for google. Creating new insatnce of firebase.auth.GoogleAuthProvider()
// use "new" keyword
const googleProvider = new firebase.auth.GoogleAuthProvider();

//setting custom params
googleProvider.setCustomParameters({ prompt: "select_account" });

//utility function  that will be called when clicked on sign-in with google button
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

//function that will handle user profile

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const { uid } = userAuth;

  // giving firebase database path
  const userRef = firestore.doc(`Users/${uid}`);

  const snapshot = await userRef.get();
  //snapshot is another obect with various functions returned us userRef.get()

  //snapshot.exists is a boolean value
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};
