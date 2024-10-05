// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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
const db = getDatabase(app);
const firestore = getFirestore(app); // Initialize Firestore

// Function to get the current date
function displayCurrentDate() {
    const date = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    document.getElementById("current-date").innerText = date.toLocaleDateString(undefined, options);
}

// Function to load user and feedback count from Firebase
async function loadCounts() {
    try {
        // Get user count from Firestore
        const usersRef = collection(firestore, 'users');
        const userSnapshot = await getDocs(usersRef);
        const userCount = userSnapshot.size; // Get the number of users

        document.getElementById("user-count").innerText = userCount;

        // Get feedback count from Realtime Database
        const feedbackRef = ref(db, 'contact_form'); // Feedback data node
        const feedbackSnapshot = await get(feedbackRef);

        // Update feedback count
        const feedbackCount = feedbackSnapshot.exists() ? Object.keys(feedbackSnapshot.val()).length : 0;
        document.getElementById("feedback-count").innerText = feedbackCount;

    } catch (error) {
        console.error("Error fetching counts: ", error);
    }
}

// Call functions to display date and counts
displayCurrentDate();
loadCounts();