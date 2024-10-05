const firebaseConfig = {
    apiKey: "AIzaSyCEFTja7F1_9ltuFszTrvc99Qj6akpyy-o",
    authDomain: "sentiment-analysis-syste-f8fdc.firebaseapp.com",
    databaseURL: "https://sentiment-analysis-syste-f8fdc-default-rtdb.firebaseio.com",
    projectId: "sentiment-analysis-syste-f8fdc",
    storageBucket: "sentiment-analysis-syste-f8fdc.appspot.com",
    messagingSenderId: "389392984594",
    appId: "1:389392984594:web:cad81bd83a4f28a5d346cb"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var contactFormDB = firebase.database().ref('contact_form');

document.getElementById('contact_form').addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    var contact_name = getElementVal('contact_name');
    var contact_email = getElementVal('contact_email');
    var contact_message = getElementVal('contact_message');

    console.log("Name: ", contact_name); // Log the values being sent
    console.log("Email: ", contact_email);
    console.log("Message: ", contact_message);

    saveMessages(contact_name, contact_email, contact_message);

    // enable alert
    document.querySelector(".alert").style.display = "block";

    // remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // reset the form
    document.getElementById('contact_form').reset();

}

const saveMessages = (contact_name, contact_email, contact_message) => {
    var newcontact_form = contactFormDB.push();

    newcontact_form.set({
        contact_name: contact_name,
        contact_email: contact_email,
        contact_message: contact_message,
        status: "Pending" // Set default status to Pending
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};