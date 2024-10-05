// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth();
const db = getFirestore();

// Show message function
function showMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
        messageDiv.style.display = "none";
    }, 5000);
}


// Function to retrieve existing admins from Firestore
async function getAdmins() {
    const adminList = document.getElementById('adminList');
    adminList.innerHTML = ''; // Clear existing list

    try {
        const querySnapshot = await getDocs(collection(db, "admins")); // Make sure "admins" is the correct Firestore collection
        querySnapshot.forEach((doc) => {
            const admin = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${admin.firstName}</td>
                <td>${admin.lastName}</td>
                <td>${admin.email}</td>
            `;
            adminList.appendChild(row); // Append the new row to the table
        });
    } catch (error) {
        console.error("Error fetching admins:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('adminLoginForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const email = document.getElementById('email').value.trim(); // Trim whitespace
        const password = document.getElementById('password').value;

        // Validate input fields
        if (!email || !password) {
            showMessage('Email and password cannot be empty.');
            return;
        }

        try {
            // Attempt to sign in with the provided email and password
            await signInWithEmailAndPassword(auth, email, password);
            showMessage('Login successful!');

            // Redirect to admin dashboard or another page after successful login
            window.location.href = 'admin_dash.html';

        } catch (error) {
            console.error(error); // Log the error for debugging

            // Handle different error codes
            switch (error.code) {
                case 'auth/wrong-password':
                    showMessage('Incorrect password. Please try again.');
                    break;
                case 'auth/user-not-found':
                    showMessage('No user found with this email. Please check your email.');
                    break;
                case 'auth/invalid-email':
                    showMessage('The email address is not valid.');
                    break;
                case 'auth/invalid-credential':
                    showMessage('Invalid Email or Password. Please try again.');
                    break;
                default:
                    showMessage('Error logging in: ' + error.message);
                    break;
            }
        }
    });

    // Add password reset functionality
    document.getElementById('forgotPasswordLink').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        const email = prompt("Please enter your email address:");

        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    showMessage("Password reset email sent! Please check your inbox.");
                })
                .catch((error) => {
                    console.error("Error sending password reset email:", error);
                    showMessage(error.message);
                });
        }
    });
});


// Check authentication state and retrieve admins after successful login
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, retrieve admins
        getAdmins();
    } else {
        // No user is signed in, you can handle the state accordingly
        showMessage('You need to be logged in to view admin data.');
    }
});

// Password validation function
function isPasswordValid(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    return password.length >= minLength && hasUppercase;
}

// Add Admin Functionality
document.getElementById('addAdminBtn').addEventListener('click', async () => {
    const firstName = document.getElementById('adminFirstName').value;
    const lastName = document.getElementById('adminLastName').value;
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const confirmPassword = document.getElementById('adminConfirmPassword').value;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match.');
        return;
    }

    // Check password validity
    if (!isPasswordValid(password)) {
        showMessage('Password must be at least 8 characters long and include at least one uppercase letter.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store admin details in Firestore
        await setDoc(doc(db, "admins", user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email
        });

        showMessage('Admin account created successfully!');
        // Optionally refresh or add to the table
        addAdminToTable(firstName, lastName, email);

        // Clear input fields
        document.getElementById('adminFirstName').value = '';
        document.getElementById('adminLastName').value = '';
        document.getElementById('adminEmail').value = '';
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminConfirmPassword').value = '';
    } catch (error) {
        console.error('Error creating admin:', error); // Log the error for debugging
        showMessage('Error creating admin: ' + error.message);
    }
});

// Function to add admin info to the table
function addAdminToTable(firstName, lastName, email) {
    const adminList = document.getElementById('adminList');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${firstName}</td><td>${lastName}</td><td>${email}</td>`;
    adminList.appendChild(newRow);
}