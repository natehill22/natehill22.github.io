//Adds dynamic nav-highlighting upon scroll
window.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    //Monitors page scrolling
    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        //Loops through all sections 
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;

            //Checks if scroll position is within the section
            if (window.scrollY >= sectionTop - 150) { //Accounts for offset header height
                currentSectionId = section.getAttribute("id");
            }
        });

        //Strips 'active' class from all links, then adds it to visible section links
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
});

//Contact Modal

//Toggles state of contact form pop-up
function toggleForm() {
    const formPopup = document.getElementById("myForm");
    if (!formPopup) return; //Cancels execution if no form Popup exists

    //Determines if contact modal is open/visible on the screen
    const isHidden = window.getComputedStyle(formPopup).display === "none";

    if (isHidden) {
        formPopup.style.display = "block"; //If toggleForm is called while contact form is hidden, show form popup
    } else {
        formPopup.style.display = "none"; //If toggleForm is called while contact form is showing, hide it
    }
}

//Closes the contact form
function closeForm() {
    const formPopup = document.getElementById("myForm");
    if (formPopup) {
        formPopup.style.display = "none";
    }
}

//Handles form validations using Regex
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const phoneErrors = document.getElementById("phoneErrors");
    const emailErrors = document.getElementById("emailErrors");

    if (form) {
        form.addEventListener("submit", function (event) {
            //Clears previous errors
            if (phoneErrors) phoneErrors.innerHTML = "";
            if (emailErrors) emailErrors.innerHTML = "";
            let pError = [];
            let eError = [];

            //Get input values (cleaned of excess space)
            const phoneValue = document.getElementById("phone").value.trim();
            const emailValue = document.getElementById("email").value.trim();

            //Validate Phone
            if (phoneValue !== "") {
                const phoneRegEx = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
                if (!phoneRegEx.test(phoneValue)) {
                    pError.push(" must be in proper format."); //Shows error upon fail condition
                }
            }

            //Validate Email
            const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegEx.test(emailValue)) {
                eError.push(" must be in proper format."); //Shows error upon fail condition
            }

            //If there are errors, stop form submission and display them
            if ((pError.length > 0) || (eError.length > 0)) {
                event.preventDefault(); //Prevents form submission
                if (phoneErrors) phoneErrors.innerHTML = pError;
                if (emailErrors) emailErrors.innerHTML = eError; //Push error messages to the HTML
            }
        });
    }
});

//Closes the contact pop-up form when the user clicks outside of it
document.addEventListener("click", function(event) { 
    const formPopup = document.getElementById("myForm");

    //Exits immediately if form doesn't exist
    if (!formPopup) return;

    //Determines if contact modal is open/visible on the screen
    const isVisible = window.getComputedStyle(formPopup).display === "block";
    if (!isVisible) return; //Cancels execution if no form Popup exists

    //Checks if user clicked the close button
    const clickedCancel = event.target.classList.contains("cancel");

    //Checks if user clicked inside form container
    const clickedInsideForm = event.target.closest(".form-popup");

    //Checks if user clicked any buttons meant to open form
    const clickedOpenButton = event.target.closest(".pop-up-button");
    const clickedNavButton = event.target.closest(".contact-nav-btn");
    const clickedInlineButton = event.target.closest(".inline-contact-btn");
    const clickedLinkButton = event.target.closest(".contact-link-btn");

    //Closes form if cancel is clicked or clicked outside the modal
    if (clickedCancel || (!clickedInsideForm && !clickedOpenButton && !clickedNavButton && !clickedInlineButton && !clickedLinkButton)) {
        closeForm();
    }
});

//Skills Slideshow

//Displays the first image in the slideshow upon page load
let slideIndex = 1;

//Changes slide when the left or right arows are clicked
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//Changes the slide when dots are clicked
function currentSlide(n) {
    showSlides(slideIndex = n);
}

//Renders the chosen image
function showSlides (n) {
    const slides = document.getElementsByClassName("mySlides"); //Takes all 'mySlides' class elements and stores them in the 'slides' array  
    const dots = document.getElementsByClassName("dot"); //Takes all 'dot' class elements and stores them in the 'dots' array

    if (slides.length === 0) return; //Protects against bugged state by cancelling function whenever a length of 0 is reached
    if (n > slides.length) {slideIndex = 1}; //If the number passed into the function is greater than the length of the 'slides' array, set slideIndex to 1 (show the first image)
    if (n < 1 ) {slideIndex = slides.length}; //If the number passed into the function is less than 1 (on the 'slides' array), set slides to equal the count of all its elements (show the last image)
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; //For each element in the slides array, set the display to none (hide them all)
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active"); //For each element in the dots array, remove the active status (hide them all)
    }
    slides[slideIndex - 1].style.display = "block"; //Shows the selected image. slideIndex - 1 to align the # of length with the array indexing (which is one lower)

    if (dots.length >= slideIndex) { 
        dots[slideIndex - 1].classList.add("active"); //Adds active styling to the dot associated with the image - shows the image. slideIndex - 1 to align the # of length with the array indexing (which is one lower)
    }
}

//Execute initial slide rendering immediately
showSlides(slideIndex);