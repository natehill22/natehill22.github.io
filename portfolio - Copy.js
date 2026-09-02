//Open the contact form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

//Closes the contact form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

//Displays the first image in the slideshow upon page load
var slideIndex = 1;
showSlides(slideIndex);

//Changes slide when the left or right arows are clicked
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//Changes the slide when dots are clicked
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides (n) {
    var slides = document.getElementsByClassName("mySlides"); //Takes all 'mySlides' class elements and stores them in the 'slides' array  
    var dots = document.getElementsByClassName("dot"); //Takes all 'dot' class elements and stores them in the 'dots' array
    if (n > slides.length) {slideIndex = 1}; //If the number passed into the function is greater than the length of the 'slides' array, set slideIndex to 1 (show the first image)
    if (n < 1 ) {slideIndex = slideIndex.length}; //If the number passed into the function is less than 1 (on the 'slides' array), set slideIndex to equal the count of all its elements (show the last image)
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; //For each element in the slides array, set the display to none (hide them all)
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); //For each element in the dots array, change the active status to blank (hide them all)
    }
    slides[slideIndex - 1].style.display = "block"; //Shows the selected image. slideIndex - 1 to align the # of length with the array indexing (which is one lower)
    dots[slideIndex - 1].className += " active"; //Adds active styling to the dot associated with the image - shows the image. slideIndex - 1 to align the # of length with the array indexing (which is one lower)
}

//Closes the contact pop-up form when the user clicks outside of it
document.addEventListener("click", function(event) { //Adds an event listener for any clicks on the website
    if (event.target.matches(".cancel") || !event.target.closest(".form-popup") && !event.target.closest(".pop-up-button") && !event.target.closest(".contact")) {
        closeForm() //If the click happens on the cancel button OR anywhere that's not the contact form AND doesn't happen on any element with the contact class, close the form pop-up
    }
}, false )