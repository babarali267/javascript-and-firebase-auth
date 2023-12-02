import "./style.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
   onAuthStateChanged,
   signInWithEmailLink ,
   signOut


} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

  // loginUser  with email link function
const notify = document.querySelector('#notify');


function loginUser() {
  const email = document.querySelector('#email').value;
  if (!email) {
    notify.innerHTML = "Please enter your Email";
    return;
  }

  const actionCodeSettings = {
    url: "http://localhost:5173/",
    handleCodeInApp: true,
  };

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      notify.innerHTML = "Check your Email address";
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
      console.log(error);
      notify.innerHTML = "Failed login";
    });
}

// Check if it's a sign-in link
const isSignInLink = isSignInWithEmailLink(auth, window.location.href);

if (isSignInLink) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
     notify.innerHTML  =  " Something Wrong "
  }

  // If sign-in link is confirmed
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

// onAuthStateChanged
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector('.user_form').classList.add('hide');
      document.querySelector('.admin_page').classList.add('show');
  }
});

const loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', loginUser);



// logout user 

function logoutUser(){

     signOut(auth).then(()=>{

      document.querySelector('.user_form').classList.remove('hide');
      document.querySelector('.admin_page').classList.remove('show');
       window.localStorage.removeItem('emailForSignIn')
     })
}

 const logout_btn = document.querySelector('#logout')
 logout_btn.addEventListener('click',logoutUser)

 