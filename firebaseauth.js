// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8sWAa2aF1cpBg-fFEjPNFOU6kRqp7FL4",
  authDomain: "login-d28ea.firebaseapp.com",
  projectId: "login-d28ea",
  storageBucket: "login-d28ea.firebasestorage.app",
  messagingSenderId: "182140038377",
  appId: "1:182140038377:web:52424a3b99a2c9ac02d478"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId)
    messageDiv.style.display = "block"
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(function() {
        messageDiv.style.opacity = 0;

    }, 5000);
}

const signUp = document.getElementById("submitSignUp")

signUp.addEventListener('click' , (event)=>{
    event.preventDefault()
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const userData = {
                email : email,
                firstName : firstName,
                lastName : lastName
        }  
        showMessage("Account created Sucessfully ", 'signUpMessage')
        const docRef = doc(db,  "users", user.uid)
        setDoc(docRef, userData )
        .then(()=>{
            window.location.href = "index.html"
        })
        .catch((error) =>{
            console.error("error writing document" , error)
        })
    }) 
    .catch ((error)=>{
        const errorCode = error.code;
        if(errorCode =="auth/email-already-in-use"){
            showMessage("Email Address already exists !!!", 'signUpMessage')
        }
        else{
            showMessage ('unable to create User', 'signUpMessage')
        }
    })

})

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth()

    signInWithEmailAndPassword(auth,email, password)
    .then((userCredential)=>{
        showMessage('Login is successful' , 'signInMessage')
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid)
        window.location.href = 'homepage.html'
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode ==='auth/invalid-credentail'){
            showMessage('Incorrect email or password', 'signInMessage')
        }
        else{
            showMessage('Account does not exists', 'signInMessage') 
        }
    })
})