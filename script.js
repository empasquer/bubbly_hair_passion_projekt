
// burger menu


const menu = document.querySelector(".burger_menu");
const menuItems = document.querySelectorAll("li");
const hamburger = document.querySelector("#hamburger");
const closeIcon = document.querySelector("#burger_opened");
const menuIcon = document.querySelector("#burger_closed");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(function (li) {
  li.addEventListener("click", toggleMenu);
});
// burger menu slut
const popup1 = document.querySelector("#popup_opening");
const luk1 = document.querySelector("#luk1");

window.addEventListener("DOMContentLoaded", start);


function start() {
luk1.addEventListener("click", lukOpeningPopup);
}

function lukOpeningPopup() {
    popup1.classList = "noshow";
}