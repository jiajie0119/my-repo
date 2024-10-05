// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, get, update, remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

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
const db = getDatabase(app);

// Function to load user feedback from Firebase Realtime Database
async function loadUserFeedback() {
    try {
        const userFeedbackTableBody = document.querySelector("tbody");
        const feedbackRef = ref(db, 'contact_form'); // Reference to the contact_form node
        const snapshot = await get(feedbackRef); // Fetch all feedback

        // Clear existing table rows
        userFeedbackTableBody.innerHTML = '';

        if (snapshot.exists()) {
            const feedbackData = snapshot.val();
            console.log("Feedback data:", feedbackData); // Log feedback data

            Object.keys(feedbackData).forEach((key) => {
                const feedback = feedbackData[key];
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${feedback.contact_email}</td>
                    <td>${feedback.contact_message}</td>
                    <td>
                        <select class="status-dropdown" data-id="${key}">
                            <option value="Pending" ${feedback.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="Completed" ${feedback.status === "Completed" ? "selected" : ""}>Completed</option>
                            <option value="In Process" ${feedback.status === "In Process" ? "selected" : ""}>In Process</option>
                        </select>
                    </td>
                    <td>
                        <button class="delete-button btn btn-delete" data-id="${key}">Delete</button> <!-- Delete button -->
                    </td>
                `;

                const statusDropdown = row.querySelector(".status-dropdown");
                setDropdownColor(statusDropdown, feedback.status); // Change to feedback.status

                statusDropdown.addEventListener("change", async () => {
                    const newStatus = statusDropdown.value;
                    await updateFeedbackStatus(key, newStatus);
                    setDropdownColor(statusDropdown, newStatus);
                });

                // Add delete button event listener
                const deleteButton = row.querySelector(".delete-button");
                deleteButton.addEventListener("click", async () => {
                    const confirmed = confirm("Are you sure you want to delete this feedback?");
                    if (confirmed) {
                        await deleteFeedback(key);
                        loadUserFeedback(); // Reload feedback after deletion
                    }
                });

                userFeedbackTableBody.appendChild(row);
            });
        } else {
            console.log("No feedback data available.");
        }
    } catch (error) {
        console.error("Error fetching feedback data: ", error);
    }
}

// Function to set the background color based on the status
function setDropdownColor(dropdown, status) {
    if (status === "Completed") {
        dropdown.style.backgroundColor = "#28A745"; // Green for Completed
    } else if (status === "Pending") {
        dropdown.style.backgroundColor = "#FFC107"; // Orange for Pending
    } else if (status === "In Process") {
        dropdown.style.backgroundColor = "#007BFF"; // Blue for In Process
    } else {
        dropdown.style.backgroundColor = "#fff"; // Default background
    }
}

// Function to update the feedback status in Firebase Realtime Database
async function updateFeedbackStatus(feedbackId, newStatus) {
    try {
        const feedbackRef = ref(db, `contact_form/${feedbackId}`);
        await update(feedbackRef, { status: newStatus });
        console.log(`Feedback status updated to ${newStatus} for ID: ${feedbackId}`);
    } catch (error) {
        console.error("Error updating feedback status: ", error);
    }
}

// Function to delete feedback from Firebase Realtime Database
async function deleteFeedback(feedbackId) {
    try {
        const feedbackRef = ref(db, `contact_form/${feedbackId}`);
        await remove(feedbackRef);
        console.log(`Feedback with ID: ${feedbackId} has been deleted.`);
    } catch (error) {
        console.error("Error deleting feedback: ", error);
    }
}

// Call loadUserFeedback when the script loads
loadUserFeedback();