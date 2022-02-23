// burger menu

// constanter for alle mine burger menu elementer
const menu = document.querySelector(".burger_menu");
const menuItems = document.querySelectorAll("li");
const hamburger = document.querySelector("#hamburger");
const closeIcon = document.querySelector("#burger_opened");
const menuIcon = document.querySelector("#burger_closed");

//hvis jeg clicker på hamburger så sender det til toggleMenu
hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
  //hvis min menu indeholder klassen ... så skal man fjerne den og ændre ikon på knappen
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    //samme her bare for når den er lukket
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

//er lidt usikker på hvor meget jeg skal skrive i kommentar så heg skriver bare det hele i guess
// loop af mine li i menuen så de alle har click og sender til toggleMenu
menuItems.forEach(function (li) {
  li.addEventListener("click", toggleMenu);
});

// burger menu slut

//***************************/

// første pop up
//mine constanter
const popup1 = document.querySelector("#popup_opening");
const luk1 = document.querySelector("#luk1");

//kig i start function for at se mere om opening pop up (suspens)

// ****************************videre/

// sortering af hårtyper

//alt info og data i const
const url = "https://shampoobizz-80fc.restdb.io/rest/produkt";
const key = "621205d334fd621565858848";
const options = {
  headers: {
    "x-apikey": key,
  },
};


//flere constanter for html elementer
const btn = document.querySelectorAll("button");
const container = document.querySelector("#liste");
const temp = document.querySelector("template");
const h3 = document.querySelector("#kategorih3");

const popup = document.querySelector("#popup");
const luk = document.querySelector("#luk");

// variabler her

let haartype = "alle";
let produkter;
let nyhedenValgt = "alle";


//the one that makes it start alt skal være loaded før der skal ske andet

const checkbox = document.querySelector(".nyhed_check");

window.addEventListener("DOMContentLoaded", start);

function showPopUpOpening() {
  popup1.style.display = "block";
  luk1.addEventListener("click", lukOpeningPopup);
}

setTimeout(showPopUpOpening, 3500);
setTimeout(lukOpeningPopup, 120000);

//start function
function start() {
  //videre på opening popup, hvis man clicker på krydset så sender vi det vider til lukblabla function
  popup1.style.display = "none";
  //der siger vi at alle knapper skal have click event for at kunne sorter ting, vi sender til filtrerHairType
  btn.forEach((knap) => knap.addEventListener("click", filterHairType));

  checkbox.addEventListener("change", filterNyhed);

  //   kalder hentData her
  hentData();
}

//ny gammel function, den bruges kun i starten
function lukOpeningPopup() {
  console.log("lukOpeningPopup");
  //luk functionen som lukker opening pop up'en
  popup1.style.display = "none";
}

//nu er vi ved filtrerHaitType
function filterNyhed() {
  if (checkbox.checked) {
    nyhedenValgt = true;
  } else {
    nyhedenValgt = "alle";
  }
  visHairType();
}

function filterHairType() {
  // jeg ændrer min variabel filter til at den skal være en kategori (se html med dataset)
  haartype = this.dataset.kategori;

  //der vil jeg gerne vise hvad for en knp der er blevet clicked på så jeg giver den en class med noget funky et eller andet
  document.querySelector(".valgt").classList.remove("valgt");
  //this er så den knap der er blevet trykket på og ikke dem alle
  this.classList.add("valgt");

  //sender til vishairType som skal vise hair types
  visHairType();
  h3.textContent = this.textContent;
}

//hentdata function, uden den ville der ikke være noget content jo
async function hentData() {
  //jeg kigger tilbage på hvad mine const url og options var, så kan jeg se at jeg gerne vil "fetche" hvad de parameters indeholder, her er det json halløj, ved ikke om det hedder bare json eller json liste......
  const respons = await fetch(url, options);
  produkter = await respons.json();
  console.log(produkter);

  // nyhederne = produkter.filter((produkt) => (produkt.nyhed = nyheden));
  //der vil vi altsp gerne se vores hår typer, så vi sender den derover
  visHairType();
}

//endelig er vi der hvor vi kan se vores hårtyper
function visHairType() {
  //her er der masser af console.log fordi jeg skulle lige bedre forstår the process, har måske slettet dem
  console.log(visHairType);

  console.log("hairtypes", produkter);
  //vi siger at vores const container skal være tom
  container.textContent = "";

  //looop view af mine typer
  produkter.forEach((type) => {
    console.log(type.nyhed);
    if (
      (haartype == "alle" && type.nyhed == nyhedenValgt) ||
      (haartype == type.kategori && type.nyhed == nyhedenValgt) ||
      (haartype == "alle" && nyhedenValgt == "alle") ||
      (haartype == type.kategori && nyhedenValgt == "alle")
    ) {
      console.log("foreach kører");
      //jeg kloner min template og vil gerne ændre dens conent
      const klon = temp.cloneNode(true).content;
      //her er det image content, source og alt (alt skal man bare ikke glemme, har mikkels stemme i mit hovedet lige nu)
      klon.querySelector(
        ".image"
      ).src = `http://emsportfolio.dk/kea/07_dynamisk/bubbly_hair_passion_projekt/produkter/${type.billedenavn}.png`;
      klon.querySelector(".image").alt = type.navn;
      //nåh altså ny titel og ny pris osv osv til alle de ting jeg vil se fra min database
      klon.querySelector(".navn").textContent = type.navn;
      klon.querySelector(".str").textContent = type.str + " ml";
      klon.querySelector(".pris").textContent += type.pris + " dkk";
      //jeg gør det sådan at hvis man clicker på moin artikel at der så kommer en pop up eller modal op
      klon
        .querySelector("#artikel_image")
        .addEventListener(
          "click",
          () => (location.href = `vis_detaljer.html?id=${type._id}`)
        );
      //jeg sætter mit ny content fast til container, eller i altså
      container.appendChild(klon);
    }
  });


  const fave = document.querySelectorAll(".fave_ikon");

  fave.forEach((favorite) => favorite.addEventListener("click", faveClicked));

  function faveClicked() {
    if (this.classList.contains("fave_ikon_clicked")) {
      this.classList.remove("fave_ikon_clicked");
    } else {
      this.classList.add("fave_ikon_clicked");
    }
  }
}

//functionen som åbner modal/popup med info om alle mine produkter i forhold til hvad for et jeg har clicket på

// function visDetaljer(type) {
//   console.log("typen: ", type);
//   popup.style.display = "block";
//   popup.querySelector(".image").src = `/produkter/${type.billedenavn}.png`;
//   popup.querySelector(".image").alt = type.navn;
//   popup.querySelector(".navn").textContent = type.navn;
//   popup.querySelector(".str").textContent = `${type.str} mL`;
//   popup.querySelector(".pris").textContent = `${type.pris} dkk`;
//   popup.querySelector(".desc").textContent = type.beskrivelse;
//   popup.querySelector(".indhold").textContent = type.indhold;
// }

// luk.addEventListener("click", () => (popup.style.display = "none"));
