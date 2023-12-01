import './style.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, 
  createUserWithEmailAndPassword ,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
}  from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)


const notify = document.querySelector('#notify')

/******************
 * SignUp User 
 *******************/

 function createUser(){
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
       if(email == "" || password == ""){
        notify.innerText = "Plz provide email and password !!"
       }else{

        createUserWithEmailAndPassword(auth, email,password).then((userCredentials)=>{
           const user = userCredentials.user;
           if(user){
            notify.innerText = "User Created Success!!"
           }else{
            notify.innerText = "sorry something wrong"
           }
        }).catch((err)=>{
           console.log(err);
        })

       }
 }

 const signup_btn = document.querySelector("#signup_btn");
 signup_btn.addEventListener('click', createUser)



/******************
 * Login  User 
 *******************/
  function loginUser (){
  
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if(email == "" || password == ""){
      notify.innerText = "Plz provide email and password !!"
     }else{
            
      signInWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
            const user  = userCredentials.user;
            console.log("login user");
    
      })
       .catch((err)=>{
          console.log(errr);
       })
     }

  }


const login_btn = document.querySelector('#login_btn')
login_btn.addEventListener('click',loginUser)

// after login 


onAuthStateChanged(auth,(user)=>{
   if(user){
    document.querySelector('.user_form').classList.add('hide')
    document.querySelector('.admin_page').classList.add('show')
   }
})


// logout 

 function logOutUser (){
      signOut(auth).then(()=>{
        document.querySelector('.user_form').classList.remove('hide')
   document.querySelector('.admin_page').classList.remove('show')
      }).catch((err)=>{
         console.log(err);
      })
 }
const logout_btn = document.querySelector('#logout')
logout_btn.addEventListener('click' , logOutUser)


// forget password 
 const notify2 = document.querySelector('.notify2')

 function showForgetPasswordForm(){
   document.querySelector('.forget_password').classList.add('visible')
 }

 function forgetPassword (){
    const email = document.querySelector('#forget_email').value;
     if(email === ""){
       notify2.innerText = "Please enter your email"
     }else{
      sendPasswordResetEmail (auth,email).then(()=>{
        notify2.innerText = "password rest email send check your email inbox"
      }).then((err)=>{
         console.log(err);
      })
     }
 }

const forget_link = document.querySelector('#forget_link');
forget_link.addEventListener('click', showForgetPasswordForm)

const forget_btn = document.querySelector('#forget_btn');
forget_btn.addEventListener('click', forgetPassword)

