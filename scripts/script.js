/* HAMBURGER MENU */

const hamburger = document.querySelector(".navbar__hamburger");
const list = document.querySelector(".navbar__links");
const toggleMenu = () => {
  hamburger.classList.toggle("navbar__hamburger--active");
  list.classList.toggle("navbar__links--active");
};
hamburger.addEventListener("click", toggleMenu);

/* CHANGE NAVIGATION */

const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const sectionOptions = {
  rootMargin: "-200px"
};
const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}, sectionOptions);

observer.observe(header);

/* SLIDER */

const slider = document.querySelector(".header__image-container");
const arrow = document.querySelectorAll(".header__arrow");
const dots = document.querySelectorAll(".header__dots-item");
const slides = document.querySelectorAll(".header__image-element");
dots[0].style.backgroundColor = "#ffcd19";

let slideIndex = 0;

const infiniteSlider = () => {
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  } else if (slideIndex > slides.length - 1) {
    slideIndex = 0;
  }
};

const updateSlider = () => {
  infiniteSlider();
  let size = 100 * slideIndex;
  slider.style.transform = "translateX(" + -size + "%)";
  dots.forEach(dot => (dot.style.backgroundColor = "white"));
  dots[slideIndex].style.backgroundColor = "#ffcd19";
};

function slide() {
  slider.style.transition = "transform .5s ease-in-out";
  updateSlider();
}

function btnCheck() {
  if (this.id === "prev") {
    slideIndex--;
  } else if (this.id === "next") {
    slideIndex++;
  }

  slide();
}

function dotCheck() {
  switch (this.id) {
    case "dot-one":
      slideIndex = 0;
      break;
    case "dot-two":
      slideIndex = 1;
      break;
    case "dot-three":
      slideIndex = 2;
      break;
    case "dot-four":
      slideIndex = 3;
      break;
  }

  slide();
}

arrow.forEach(btn => btn.addEventListener("click", btnCheck));
dots.forEach(dot => dot.addEventListener("click", dotCheck));

function changeSlide() {
  slideIndex++;
  slide();
}

setInterval(changeSlide, 10000);

/* YOUTUBE POPUP */

const modal = document.getElementById("modal");
const play = document.getElementById("btn-play");
const close = document.getElementById("btn-close");
const video = document.getElementById("video");

play.onclick = function() {
  modal.style.display = "flex";
  video.src = "https://www.youtube.com/embed/uWh6hKx3R74";
};

close.onclick = function() {
  modal.style.display = "none";
  video.src = "#";
};

/* FORM VALIDATION */
const form = document.forms["form"];
const inputName = form["name"];
const inputSurname = form["surname"];
const inputEmail = form["email"];
const inputArea = form["area-text"];
const checkbox = form["checkbox"];
const checkboxLabel = document.getElementById("checkbox-label");

const validateForm = () => {
  event.preventDefault();
  let name = inputName.value.trim();
  let surname = inputSurname.value.trim();
  let email = inputEmail.value.trim();
  let area = inputArea.value.trim();
  let isNameValid = name === "" || !/^[a-zA-z]+$/g.test(name);
  focusInput(inputName, isNameValid);
  let isSurnameValid = surname === "" || !/^[a-zA-z]+$/gi.test(surname);
  focusInput(inputSurname, isSurnameValid);
  let isEmailValid =
    email === "" ||
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  focusInput(inputEmail, isEmailValid);
  let isAreaValid = area === "";
  focusInput(inputArea, isAreaValid);
  let isChecked = checkbox.checked;
  focusInput(checkboxLabel, !isChecked);

  if (
    !(isNameValid && isSurnameValid && isEmailValid && isAreaValid) &&
    isChecked
  ) {
    sendMessage();
  }
};

const focusInput = (element, isValid) => {
  if (isValid) {
    if (element == checkboxLabel) {
      element.style.color = "red";
    } else {
      element.style.color = "red";
      element.style.border = "1px solid red";
    }
    return;
  }
  if (!isValid) {
    element.style.border = "none";
    element.style.color = "#333";
  }
};

/* SEND FORM */

const formObj = {
  name: document.getElementById("form-name"),
  surname: document.getElementById("form-surname"),
  email: document.getElementById("form-email"),
  message: document.getElementById("form-message"),
  checkbox: document.getElementById("form-checkbox"),
  submit: document.getElementById("form-submit")
};

function sendMessage() {
  const request = new XMLHttpRequest();

  const requestData = `name=${formObj.name.value}
  &surname=${formObj.surname.value}
  &email=${formObj.email.value}
  &message=${formObj.message.value}
  &checkbox=${formObj.checkbox.checked}`;

  request.open("post", "message.php");
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(requestData);
}

/* MAP */
function initMap() {
  let map;
  let cdvLatLng = { lat: 52.416487, lng: 16.93182 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: cdvLatLng,
    zoom: 20
  });
  let marker = new google.maps.Marker({
    map: map,
    position: cdvLatLng,
    icon: "../src/assets/location.png",
    title: "Collegium Da Vinci"
  });
}

/* FOOTER */

const footerTitle = document.querySelectorAll(".footer__list-title");
const footerList = document.querySelectorAll(".footer__list");

function toogleList(element) {
  footerList.forEach(e => e.classList.remove("footer__list--active"));
  footerTitle.forEach(e => e.classList.remove("footer__list-title--active"));
  footerList[element].classList.toggle("footer__list--active");
  footerTitle[element].classList.toggle("footer__list-title--active");
}

function closeList(element) {
  footerList[element].classList.remove("footer__list--active");
  footerTitle[element].classList.remove("footer__list-title--active");
}

function selectTitle() {
  switch (this.id) {
    case "list-one":
      toogleList(0);
      break;
    case "list-two":
      toogleList(1);
      break;
    case "list-three":
      toogleList(2);
      break;
    case "list-four":
      toogleList(3);
      break;
    case "list-five":
      toogleList(4);
      break;
  }
}

function closeTitle() {
  switch (this.id) {
    case "list-one":
      closeList(0);
      break;
    case "list-two":
      closeList(1);
      break;
    case "list-three":
      closeList(2);
      break;
    case "list-four":
      closeList(3);
      break;
    case "list-five":
      closeList(4);
      break;
  }
}

footerTitle.forEach(title => title.addEventListener("click", selectTitle));
footerTitle.forEach(title => title.addEventListener("dblclick", closeTitle));
