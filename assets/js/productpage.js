import { makeAPI } from "./apiwrapper.js";
import { storedata } from "./utility/localstorage.js";
import{getdata} from "./utility/localstorage.js";
///----------drop-down menu starts/
function categoriesDropMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// /-------------drop-down ends-----------/

// ------------selection of categories-----/
const categoryBar = async () => {
  const productCategories = await makeAPI("categories", "GET");
  let categoryList = document.querySelector(".filter-categories-section");
  productCategories.forEach((element) => {
    let listElement = document.createElement("li");
    listElement.classList.add("item-list");
    listElement.setAttribute("role", "button");
    listElement.setAttribute("id", element.id);
    listElement.innerText = element.name;
    categoryList.appendChild(listElement);
  });
  categoryList.addEventListener("click", productCategory);
};
categoryBar();

const filterBar = async () => {
  const productCategories = await makeAPI("categories", "GET");
  let categoryList = document.querySelector(".side-menu");
  productCategories.forEach((element) => {
    let listElement = document.createElement("li");
    listElement.classList.add("item-list");
    listElement.setAttribute("role", "button");
    listElement.setAttribute("id", element.id);
    listElement.innerText = element.name;
    categoryList.appendChild(listElement);
  });
  categoryList.addEventListener("click", productCategory);
};
filterBar();
// -------------fetching the details of products------------------

const productDetails = async (product) => {
  let output = "";
  product.forEach((element) => {
    output += `<div class="products  ">
                <div class="product-name">
                 <h3 class="product-name">${element.name}</h3>
                 </div>
                  <div class="product-info">
                    <div class="products-details">
                        <div class="product-image">
                        <img src=${".." + element.imageURL} alt=""/>
                      </div>
                    <div class="description-buy">
                     <p class="product-description">${element.description}</p>
                    <div class="product-price">
                     <p class="product-price"><button id="buyitembtn" data-id="${
                       element.id
                     }">Buy Now @ Rs.${element.price}</button></p>
                     </div>
                    </div>
                  </div>
              <div class="item-image">
                <img src=${".." + element.imageURL} alt="" />
              </div>
             <p class="item-description">${element.description}</p>
            <div class="desktopview-buy-button">
              <p>MRP Rs${element.price}</p><button id="buyitembtn" data-id="${
      element.id
    }">Buy Now</button>
        </div>
     </div>
  </div>
  `;
  });
  document.getElementById("productdetailsdisplay").innerHTML = output;
};

// -------------fetching the details of products------------------

const filterProducts = (products, categoryId) => {
  return products.filter((product) => {
    if (product.category === categoryId) {
      return product;
    }
  });
};

const createProductCards = async () => {
  const products = await makeAPI("products", "GET");
  if (products) {
    productDetails(products);
  }
};

const filterProductsHomePage = async (evt) => {
  const categoryId = localStorage.getItem("idforcategorypage");
  const products = await makeAPI("products", "GET");
  if (categoryId === "All") {
    createProductCards();
  } else if (categoryId) {
    const finalProducts = filterProducts(products, categoryId);
    productDetails(finalProducts);
  }
};
filterProductsHomePage();

const productCategory = async (evt) => {
  const categoryId = evt.target.id;
  const products = await makeAPI("products", "GET");
  const finalProducts = filterProducts(products, categoryId);
  productDetails(finalProducts);
};

function buyItem(id) {
  let idForCartPage=getdata("logindetails");
  let cartproduct=getdata("previousdata"+idForCartPage.email)||[];
  cartproduct.push(id);
  alert("product added to cart");
  storedata(idForCartPage.email,cartproduct);
  storedata("previousdata"+idForCartPage.email,cartproduct)
  // localStorage.setItem("idForCartPage", id);
}

document.addEventListener("click", (event) => {
  if (event.target.className === "item-list") {
    let innertext = event.target.innerText;
    document.getElementById("dropbtn").innerText = innertext;
  } else if (event.target.id === "buyitembtn") {
    buyItem(event.target.dataset.id);
  } else if (event.target.id === "dropbtn") {
    categoriesDropMenu();
  }
});
