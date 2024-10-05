//Get The Elements
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");

//Toggle the navbar menu on click Open/Close
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("nav-toggle");
});

// Get the popup and the button that opens it
var popup = document.getElementById("featurePopup");
var btn = document.getElementById("openPopup");
var closeBtn = document.getElementById("closePopup");

// When the user clicks the button, open the popup
btn.onclick = function () {
    popup.style.display = "block";
}

// When the user clicks on <span> (x), close the popup
closeBtn.onclick = function () {
    popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

document.getElementById('downloadPdf').addEventListener('click', function () {
    const elementToCapture = document.getElementById('pdf'); // Replace with the ID of your content

    // Use html2canvas to capture the full content
    html2canvas(elementToCapture, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;

        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calculate the width and height
        const imgWidth = 210; // A4 size width in mm
        const pageHeight = 297; // A4 size height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, Math.min(imgHeight, pageHeight));
        heightLeft -= pageHeight;

        // Add additional pages for content exceeding one page
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, Math.min(imgHeight, pageHeight));
            heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('sentiment_report.pdf');
    });
});

// Add an event listener to the filter dropdown
document.getElementById('sentimentFilter').addEventListener('change', function () {
    const selectedSentiment = this.value;
    const rows = document.querySelectorAll('#reviewsTableBody tr');

    rows.forEach(row => {
        const sentimentCell = row.cells[3].innerText; // Assuming sentiment is in the 4th column (index 3)

        if (selectedSentiment === 'all' || sentimentCell === selectedSentiment) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
});