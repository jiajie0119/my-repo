// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getAuth, updateEmail, deleteUser } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(); // Initialize Firebase Auth

// Function to retrieve user data from Firestore and display it in the table
async function loadUserProfiles() {
    try {
        const userProfilesTableBody = document.querySelector("tbody");
        const querySnapshot = await getDocs(collection(db, "users")); // Fetch all users

        // Clear existing table rows
        userProfilesTableBody.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${userData.firstName}</td>
            <td>${userData.lastName}</td>
            <td>${userData.email}</td>
            <td class="btn-group">
                <button class="btn btn-update">Update</button>
                <button class="btn btn-delete">Delete</button>
            </td>
        `;

        const updateButton = row.querySelector(".btn-update");
        updateButton.onclick = () => {
            const newFirstName = prompt("Enter new first name:", userData.firstName);
            const newLastName = prompt("Enter new last name:", userData.lastName);
            const newEmail = prompt("Enter new email:", userData.email);
            if (newFirstName && newLastName && newEmail) {
                updateUserProfile(doc.id, newFirstName, newLastName, newEmail);
            }
        };

        const deleteButton = row.querySelector(".btn-delete");
        deleteButton.onclick = () => {
            if (confirm(`Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`)) {
                deleteUserProfile(doc.id);
            }
        };

        userProfilesTableBody.appendChild(row);
    });
} catch (error) {
    console.error("Error fetching user profiles: ", error);
}
}

// Function to update user profile
async function updateUserProfile(userId, newFirstName, newLastName, newEmail) {
    try {
        const userDoc = doc(db, "users", userId);
        
        // Update Firestore user data
        await updateDoc(userDoc, {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
        });

        // Update Firebase Authentication if email is changed
        const user = auth.currentUser; // Get the currently logged-in user
        if (user && user.email !== newEmail) {
            await updateEmail(user, newEmail);
        }

        console.log("User profile updated successfully");
        loadUserProfiles(); // Refresh the user profiles
    } catch (error) {
        console.error("Error updating user profile: ", error);
    }
}

// Function to delete user profile
async function deleteUserProfile(userId) {
    try {
        // Delete user from Firestore
        await deleteDoc(doc(db, "users", userId));

        // Get the user from Firebase Authentication
        const user = auth.currentUser; // Assuming you have the user ID and it's the same
        if (user) {
            await deleteUser(user);
        }

        console.log("User profile deleted successfully");
        loadUserProfiles(); // Refresh the user profiles
    } catch (error) {
        console.error("Error deleting user profile: ", error);
    }
}

// Function to add a new user profile
async function addUserProfile(firstName, lastName, email) {
    try {
        // Add a new user document to Firestore
        await addDoc(collection(db, "users"), {
            firstName: firstName,
            lastName: lastName,
            email: email,
        });

        console.log("User profile added successfully");
        loadUserProfiles(); // Refresh the user profiles
    } catch (error) {
        console.error("Error adding user profile: ", error);
    }
}

// Function to prompt for user input and add a new user
function promptAddUser() {
    const firstName = prompt("Enter first name:");
    const lastName = prompt("Enter last name:");
    const email = prompt("Enter email:");

    // Check if all fields are filled
    if (firstName && lastName && email) {
        addUserProfile(firstName, lastName, email);
    } else {
        alert("Please fill in all fields.");
    }
}

// Add event listener to the button
document.getElementById("addUserButton").addEventListener("click", promptAddUser);

// Load user profiles on page load
loadUserProfiles();
