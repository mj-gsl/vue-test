/* PASSWORD INPUT */
const Password_input = document.querySelector(".password--input");

/* PASSWORD EYE ICON */
const Password_eye_icon = document.querySelector("#password_hidden");

/* PASSWORD EYE ICON EVENTLISTENER */
Password_eye_icon.addEventListener("click", () => {
  if (Password_input.type === "password") {
    /* Checking if the password input has the 
            type of text if so then interchange the icons */

    Password_input.type = "text";
    Password_eye_icon.setAttribute("name", "eye-outline");
    Password_eye_icon.removeAttribute("name", "eye-off-outline");
  } else {
    Password_input.type = "password";

    Password_eye_icon.setAttribute("name", "eye-off-outline");
    Password_eye_icon.removeAttribute("name", "eye-outline");
  }
});
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

//------
document.addEventListener('DOMContentLoaded', (event) => {
    const textWrapper = document.querySelector('.explanatory_text_wrapper');
    textWrapper.classList.add('blink');
    setTimeout(() => {
    textWrapper.classList.remove('blink');
  }, 1000);
  // Google login button event listener
  const googleLoginBtn = document.querySelector('.google-login-button');
  googleLoginBtn.addEventListener('click', function() {
    const loginFormWrapper = document.querySelector('.login_form_wrapper');
    loginFormWrapper.classList.toggle('active');
  });

  // Slideshow right slide in effect
  window.addEventListener('load', function() {
    const slideshowWrapper = document.querySelector('.slideshow_wrapper');
    slideshowWrapper.style.right = '0'; // Adjust as needed for initial position
  });
});


