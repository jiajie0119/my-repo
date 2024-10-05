// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEFTja7F1_9ltuFszTrvc99Qj6akpyy-o",
    authDomain: "sentiment-analysis-syste-f8fdc.firebaseapp.com",
    databaseURL: "https://sentiment-analysis-syste-f8fdc-default-rtdb.firebaseio.com",
    projectId: "sentiment-analysis-syste-f8fdc",
    storageBucket: "sentiment-analysis-syste-f8fdc.appspot.com",
    messagingSenderId: "389392984594",
    appId: "1:389392984594:web:cad81bd83a4f28a5d346cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db=getFirestore();

onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    console.log("Logged In User ID from Local Storage:", loggedInUserId);

    if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.error("Error getting document:", error.message); // Log specific error message
        });
    }
    else{
        console.log("User Id not Found in Local storage");
    }
});