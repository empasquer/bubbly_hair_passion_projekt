//************************************ burger menu */

// constanter for alle mine burger menu elementer
const menu = document.querySelector(".burger_menu");
const menuItems = document.querySelectorAll("li");
const hamburger = document.querySelector("#hamburger");
const closeIcon = document.querySelector("#burger_opened");
const menuIcon = document.querySelector("#burger_closed");

// click event så jeg kan toggle mellem åben og lukket burger menu
hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
  //  toggle mellem to "class" for enten at se hele menuen og knappen eller skjule menuen go se den anden knap
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

// giver hvert enkelt li i min menu en click event listener som sender til toggleMenu function
menuItems.forEach(function (li) {
  li.addEventListener("click", toggleMenu);
});

//**************************************************** burger menu slut */

//********************************************* første pop up */

//json og data i constanter
const url = "https://shampoobizz-80fc.restdb.io/rest/produkt";
const key = "621205d334fd621565858848";
const options = {
  headers: {
    "x-apikey": key,
  },
};

//mine constanter
const popup1 = document.querySelector("#popup_opening");
const luk1 = document.querySelector("#luk1");

const btn = document.querySelectorAll("button");
const container = document.querySelector("#liste");
const temp = document.querySelector("template");
const h3 = document.querySelector("#kategorih3");

const popup = document.querySelector("#popup");
const luk = document.querySelector("#luk");

const checkbox = document.querySelector(".nyhed_check");

// variabler for sortering af data

let haartype = "alle";
let produkter;
let nyhedenValgt = "alle";

//the one that makes it start alt skal være loaded før der skal ske andet

// *****lets begin : når window loader og alt content er loaded også sender vi til start function

window.addEventListener("DOMContentLoaded", start);

// *********************** det er min pop up function

function showPopUpOpening() {
  // jeg fortæller at min popup skal være synlig og giver knappen en function der lukker popup'en
  popup1.style.display = "block";
  luk1.addEventListener("click", lukOpeningPopup);
}

// set time out gør at function til at åbne popup'en og gør den synlig,
// sættes til at starte efter der er gået 3,5s når window har loaded
// den anden set timeout er for at hvis man ikke interagerer med popup'en,
// så lukker den automatisk ned efter der er gået 2min (sender til funtionen der gør det)
setTimeout(showPopUpOpening, 3500);
setTimeout(lukOpeningPopup, 120000);

//start function som gør og viser det vi vil se på siden

function start() {
  // hvis man clicker på krydset på popup'en så lukker vi den (sender til functionen der lukker den)
  popup1.style.display = "none";
  //der siger vi at alle knapper skal have click event for at kunne sorter ting
  // vi sender til filtrerHairType
  btn.forEach((knap) => knap.addEventListener("click", filterHairType));
  // jeg fortæller at min check knap skal reagere og sende til filterNyhed når der sker en ændring (checked eller ikke checked)
  checkbox.addEventListener("change", filterNyhed);
  //   kalder hentData her
  hentData();
}

// function til at lukke min popup
function lukOpeningPopup() {
  //sætter popup'en til ikke at være synlig
  popup1.style.display = "none";
}

function filterNyhed() {
  // jeg filtrer på hvilket data jeg vil se når checkboxen enten er clicked eller ikke clicked
  if (checkbox.checked) {
    // hvis den er checked vil jeg gerne kun se nyhederne
    nyhedenValgt = true;
  } else {
    // er den ikke checked vil jeg se alle produkter i min data
    nyhedenValgt = "alle";
  }
  // nu skal vi også se på skærmen det der sker
  visHairType();
}

function filterHairType() {
  // jeg ændrer min variabel til at den skal være en hårtype kategori (se html med dataset)
  haartype = this.dataset.kategori;

  //der vil jeg gerne vise hvad for en knap der er blevet clicked på
  // så jeg giver den en anden/extra class

  // jeg tager classen af den der har vlagt klassen, så er der kun den ene der har den klasse
  // en slags reset
  document.querySelector(".valgt").classList.remove("valgt");

  //this er så kun den knap der er blevet trykket på (ikke dem alle)
  this.classList.add("valgt");

  //sender til vishairType som skal vise hair types
  visHairType();
  h3.textContent = this.textContent;
}

//hentData function
async function hentData() {
  // jeg henter dataen fra url'en og nøglen
  const respons = await fetch(url, options);
  produkter = await respons.json();

  //nu vil vi altså gerne se vores data på skærmen, så vi sender den til visHairType
  visHairType();
}

//endelig er vi der hvor vi kan se vores hårtyper visHairType
function visHairType() {
  //vi siger at vores const container skal være tom
  // en slags reset (så den er klar til at der sker nye ting)
  container.textContent = "";

  //looop view af de hårtyper jeg har i mine produkter (altså i data'et)
  produkter.forEach((type) => {
    // stor if sætning for at sige havd for nogle parameter skal være udfyldte før der sker noget
    if (
      // hvis jeg ser alle hårtyperne og har valgt nyhed
      (haartype == "alle" && type.nyhed == nyhedenValgt) ||
      // eller
      // hvis jeg ser en af mine hårtyper kategori og har valgt nyhed
      (haartype == type.kategori && type.nyhed == nyhedenValgt) ||
      // eller
      // hvis jeg ser alle hårtyperne og har ikke valgt nyhed

      (haartype == "alle" && nyhedenValgt == "alle") ||
      // eller
      // hvis jeg ser en af mine hårtyper kategori og har ikke valgt nyhed
      (haartype == type.kategori && nyhedenValgt == "alle")
    ) {
      //***** så skal der ske det her ******/

      //jeg fortæller at min const klon skal være min template og at den skal ændre i content
      const klon = temp.cloneNode(true).content;
      //her er det image content, source og alt
      // jeg fortælle hvad der i min klon hedder .image skal have af source (som er noget i databasen så keg kalder det med data typen)
      klon.querySelector(
        ".image"
      ).src = `http://emsportfolio.dk/kea/07_dynamisk/bubbly_hair_passion_projekt/produkter/${type.billedenavn}.png`;
      // jeg fortælle hvad der i min klon hedder .image skal have af alt
      klon.querySelector(".image").alt = type.navn;
      // jeg fortælle hvad der i min klon hedder .navn skal have af navn
      // jeg gør det samme med alt det data jeg gerne vil se
      klon.querySelector(".navn").textContent = type.navn;
      klon.querySelector(".str").textContent = type.str + " ml";
      klon.querySelector(".pris").textContent += type.pris + " dkk";
      //en ny vindue til single view åbnes når man clicker på #artikel_image
      klon
        .querySelector("#artikel_image")
        .addEventListener(
          "click",
          () => (location.href = `vis_detaljer.html?id=${type._id}`)
        );
      // nu jeg har al min content i min template klon så vil jeg gerne se det på skærmen
      // appendchild på container
      container.appendChild(klon);
    }
  });

  // *********************FAVORITE/WISHLIST IKON *****************
  // const til fave_ikon (hjertet)
  const fave = document.querySelectorAll(".fave_ikon");

  //for alle single hjerte vil jeg have en click event listner som sender til faveClicked
  fave.forEach((favorite) => favorite.addEventListener("click", faveClicked));

  //faveClicked til at man kan se hvad der sker npr an har clicket på det
  function faveClicked() {
    // hvis der allerede er klassen clicked på, så skal den fjernes
    if (this.classList.contains("fave_ikon_clicked")) {
      this.classList.remove("fave_ikon_clicked");
      // hvis den ikke har klassen på skal den add'es
    } else {
      this.classList.add("fave_ikon_clicked");
    }
  }
}


// ***********SE VIDERE I VIS_DETALJER.HTML FOR RESTEN A JS *********************







// ***************** DET HER ER KODEN TIL HVIS SINGLE VIEW SKAL VÆRE MODAL *************************************
// vi har valgt at bruge single view på en ny side, derfor er det irrelevant samt et par linjer før det
// (entent kommenteret ud eller slettet for at det hele skulle virke)

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
