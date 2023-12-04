import "./style.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
   GoogleAuthProvider,
   signInWithPopup,
   onAuthStateChanged,
   signOut

} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 const Provider =  new GoogleAuthProvider()
//  Login with Google

 function loginWithGoolge(){
  signInWithPopup(auth,Provider).then((result)=>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

  }).catch((err)=>{
    console.log(err);
  })
 }

const gmail_login_btn = document.querySelector("#gmail_login_btn");
gmail_login_btn.addEventListener('click', loginWithGoolge)

// onAuthStateChanged

onAuthStateChanged(auth,(user)=>{
   if(user){
    document.querySelector('.user_form').classList.add('hide');
    document.querySelector('.admin_pages').classList.add('show');
   }else{
     console.log("sorry");
   }
})

//  signOut User 

 function logoutUser(){
     signOut(auth).then(()=>{
      document.querySelector('.user_form').classList.remove('hide');
      document.querySelector('.admin_page').classList.remove('show');
     })
 }


  const logout_btn = document.querySelector('#logout')
  logout_btn.addEventListener('click', logoutUser)




});

const loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', loginUser);



// logout user 

function logoutUser(){

     auth.signOut().then(()=>{

      document.querySelector('.user_form').classList.remove('hide');
      document.querySelector('.admin_page').classList.remove('show');
       window.localStorage.removeItem('emailForSignIn')
     })
}

 const logout_btn = document.querySelector('#logout')
 logout_btn.addEventListener('click',logoutUser)

 