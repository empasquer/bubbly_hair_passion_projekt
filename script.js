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

// første pop up
const popup1 = document.querySelector("#popup_opening");
const luk1 = document.querySelector("#luk1");

// sortering af hårtyper
const url = "https://shampoobizz-80fc.restdb.io/rest/produkt";
const key = "91a1a859ee65aa0922db45a35f046a0900eec";
const options = {
  headers: {
    "x-apikey": key,
  },
};

const btn = document.querySelectorAll("button");
const container = document.querySelector("#liste");
const temp = document.querySelector("template");
const h3 = document.querySelector("#kategorih3");

const popup = document.querySelector("#popup");
const luk = document.querySelector("#luk");

// variabel med hvad jeg vil sorter

let hairType;
let filter = "alle";

window.addEventListener("DOMContentLoaded", start);

function start() {
  luk1.addEventListener("click", lukOpeningPopup);
  btn.forEach((knap) => knap.addEventListener("click", filterHairType));
  hentData();
}

function lukOpeningPopup() {
  popup1.classList = "noshow";
}

function filterHairType() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visHairType();
  h3.textContent = this.textContent;
}

async function hentData() {
  const respons = await fetch(url, options);
  hairType = await respons.json();
  console.log(hairType);
  visHairType();
}

function visHairType() {
  console.log(visHairType);
}
