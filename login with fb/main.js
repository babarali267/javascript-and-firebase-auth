import "./style.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Provider = new FacebookAuthProvider();  // Changed provider to FacebookAuthProvider

// Login with Facebook
function loginWithFacebook() {
  signInWithPopup(auth, Provider).then((result) => {
    // Use FacebookAuthProvider instead of GoogleAuthProvider
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  }).catch((err) => {
    console.log(err);
  });
}

const fb_login_btn = document.querySelector("#fb_login_btn");
fb_login_btn.addEventListener('click', loginWithFacebook);  // Corrected function name

// onAuthStateChanged
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector('.user_form').classList.add('hide');
    document.querySelector('.admin_pages').classList.add('show');
  } else {
    console.log("sorry");
  }
});

// Sign out User
function logoutUser() {
  signOut(auth).then(() => {
    document.querySelector('.user_form').classList.remove('hide');
    document.querySelector('.admin_pages').classList.remove('show');
  });
}

const logout_btn = document.querySelector('#logout');
logout_btn.addEventListener('click', logoutUser);
