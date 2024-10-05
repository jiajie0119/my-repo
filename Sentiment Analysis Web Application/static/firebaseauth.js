// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Password validation function
function isValidPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    return password.length >= minLength && hasUpperCase;
}

// Sign Up Functionality
const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    // Validate password
    if (!isValidPassword(password)) {
        showMessage('Password must be at least 8 characters long and include at least one uppercase letter.', 'signUpMessage');
        return; // Stop form submission
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'signUpMessage');
        return; // Stop form submission
    }

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = '/';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
});

// Sign In Functionality
document.addEventListener('DOMContentLoaded', (event) => {
    const signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid); // Store user ID --
                console.log("User ID stored:", user.uid); // Log stored user ID
                showMessage('Sign In Successful', 'signInMessage');
                window.location.href = '/home'; // Redirect to the home page or desired page
            })
            .catch((error) => {
                const errorCode = error.code;
                showMessage('Invalid Email or Password. Please try again.', 'signInMessage');
            });
        });
});

// Reset Password Functionality
const resetPasswordForm = document.getElementById('resetPasswordForm');
resetPasswordForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("resetEmail").value; // Get email from input

    console.log("Reset email to be sent to:", email); // Debugging log

    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage("Password reset email sent! Please check your inbox.", 'resetMessage');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage(errorMessage, 'resetMessage'); // Display error message
        });
});