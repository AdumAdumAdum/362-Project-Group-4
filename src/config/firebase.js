import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC1oxkRTRUjrTP4h_YpZTFvoheAZJ48yDY',
  authDomain: 'project-group-4-9d314.firebaseapp.com',
  projectId: 'project-group-4-9d314',
  storageBucket: 'project-group-4-9d314.appspot.com',
  messagingSenderId: '730573272559',
  appId: '1:730573272559:web:ad31e381ab0d3a8817b21a',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        profilePicture: "https://www.famousbirthdays.com/headshots/low-tier-god-1.jpg",

      });

      await addDoc(collection(db, 'posts'), {
        uid: user.uid,
       
          dateCreated: new Date().toISOString(),
          imageUrl: "https://ap.rdcpix.com/4eb525159fae002d605290ec7bf69576l-m770973287od-w480_h360_x2.jpg",
          caption: "A place where you can share properties...",
          description: "Welcome to Estators",
          likes: null,
      })
    }
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      profilePicture: "https://www.famousbirthdays.com/headshots/low-tier-god-1.jpg",
    });

    await addDoc(collection(db, 'posts'), {
      uid: user.uid,

      dateCreated: new Date().toISOString(),
      imageUrl: "https://ap.rdcpix.com/4eb525159fae002d605290ec7bf69576l-m770973287od-w480_h360_x2.jpg",
      caption: "A place where you can share properties...",
      description: "Welcome to Estators",
      likes: null,
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

const deleteAccount = async () => {
  try {
    await deleteUser(auth.currentUser);
  } catch (err) {
    console.log("Couldn't delete the user.");
    console.error(err);
  }
};

const addPostToCollection = async (uid, imageUrl, caption, description) => {
  const post = {
    uid: uid,
    dateCreated: new Date().toISOString(),
    imageUrl,
    caption,
    description,
    likes: 0,
  };

  try {
    const docRef = await addDoc(collection(db, "posts"), post);
  } catch (err) {
    console.error(err);
  }

  return post;
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  deleteAccount,
  addPostToCollection
};
