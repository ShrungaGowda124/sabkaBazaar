import { storedata } from "./utility/localstorage.js";
import { getdata } from "./utility/localstorage.js";
import { makeAPI } from "./apiwrapper.js";
//............For banners in home page.............

// Fetching banners dynamically
async function loadbanners() {
  const offers = await makeAPI("banners", "GET");
  storedata("offer", offers);
}
loadbanners();

let imageBanners = "";
let showbanners = getdata("offer");
showbanners.forEach((element) => {
  imageBanners += `<div class="banner">
              <img src="${element.bannerImageUrl}" alt="${element.bannerImageAlt}">
              </div>`;
  document
    .getElementById("previmage")
    .insertAdjacentHTML("beforebegin", imageBanners);
});

const banners = document.querySelectorAll(".banner");
const selectdot = document.querySelectorAll(".click-dot");

//To display banners through navigation dots
let bannerDot = "";
for (let item = 1; item <= showbanners.length; item++) {
  bannerDot += `<span id="${item}" data-id="click-dot" class="click-dot"></span>`;
  document.querySelector(".navigation").innerHTML = bannerDot;
}

// for automatic navigation of banners
let counter = 1;
slidefun(counter);

let timer = setInterval(autoslide, 2000);
function autoslide() {
  counter += 1;
  slidefun(counter);
}
function plusSlides(number) {
  counter += number;
  slidefun(counter);
  resetTimer();
}
function currentSlide(number) {
  counter = number;
  slidefun(counter);
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoslide, 2000);
}

function slidefun(number) {
  let item;
  for (item = 0; item < banners.length; item++) {
    banners[item].style.display = "none";
  }
  for (item = 0; item < selectdot.length; item++) {
    selectdot[item].classList.remove("active");
  }
  if (number > banners.length) {
    counter = 1;
  }
  if (number < 1) {
    counter = banners.length;
  }
  banners[counter - 1].style.display = "block";
}

// Adding EventListener to dots, previous and next
document.addEventListener("click", (event) => {
  if (event.target && event.target.dataset.id === "click-dot") {
    currentSlide(event.target.id);
  } else if (event.target && event.target.className === "prev-image") {
    plusSlides(-1);
  } else if (event.target && event.target.className === "next-image") {
    plusSlides(1);
  }
});

//............For categories in home page.............

// Fetching category details dynamically
async function loadcategory() {
  const types = await makeAPI("categories","GET");
  storedata("details", types);
}
loadcategory();

var item = "";
let showcategory = getdata("details");

// Making two different classes for left and right images in categories
const category = (element, classname) => {
  let items = "";
  items += `<div class=${classname}>
        <img src="${showcategory[element].imageUrl}" alt="${showcategory[element].image}">
          <div class="category-desc">
            <h3>${showcategory[element].name}</h3>
            <p class="category-name">${showcategory[element].description}</p>
            <button data-id="${showcategory[element].id}">Explore ${showcategory[element].key}</button>
          </div>
        </div>`;
  return items;
};
for (let element = 0; element < showcategory.length; element++) {
  if (element % 2 == 0) {
    item += category(element, "category-even");
  } else {
    item += category(element, "category-odd");
  }
}
document.getElementById("categories").innerHTML = item;

let categorydata = getdata("details");


// navigating to product page according to categories selected
document.addEventListener("click", function (event) {
  categorydata.forEach((details) => {
    if (details.id === event.target.dataset.id) {
      localStorage.setItem("idforcategorypage", details.id);
      window.location.href = ".././views/productpage.html";
    }
  });
});
