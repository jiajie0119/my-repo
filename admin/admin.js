const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

const searchButton = document.querySelector('#content nav');
const searchButtonIcon = document.querySelector('#content nav');
const searchForm = document.querySelector('#content nav');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})

// Access the dark mode switch
const switchMode = document.querySelector('#switch-mode');

// Check for saved mode from localStorage when the page loads
window.addEventListener('DOMContentLoaded', function () {
    const savedMode = localStorage.getItem('darkMode');

    // If dark mode is enabled in localStorage, apply the dark mode
    if (savedMode === 'enabled') {
        document.body.classList.add('dark');
        if (switchMode) switchMode.checked = true;  // Ensure the switch stays checked
    } else {
        document.body.classList.remove('dark');
    }
});

// Toggle dark mode and save the preference in localStorage
if (switchMode) {
    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');  // Save preference
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled'); // Save preference
        }
    });
}