import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

const auth = getAuth()
const db = getFirestore()

onAuthStateChanged(auth, (user)=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId')
    if(loggedInUserId){
        const docRef = doc(db, 'users', loggedInUserId)
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData =docSnap.data()
                document.getElementById('loggedUserFName').innerText =userData.firstName
                document.getElementById('loggedUserEmail').innerText = userData.email
                document.getElementById('loggedUserLName').innerText = userData.lastName
            }
            else{
                console.log('no document found matching id ')
            }
        })
        .catch((error) =>{
            console.log("Error getting document")
        })
    }
    else{
        console.log("User Id not Found in Local Storage")
    }
})

const logoutButton = document.getElementById('logout')

logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId')
    signOut(auth)
    .then(()=>{
        window.location.href = 'index.html'

    })
    .catch((error)=>{
        console.error('Error in signing out', error)
    })
})