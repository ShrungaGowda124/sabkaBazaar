import { makeAPI } from "./apiwrapper.js";
import { storedata } from "./utility/localstorage.js";
import { getdata } from "./utility/localstorage.js";
const cartItemsE1 = document.querySelector(".cart-items");
const subTotalE1 = document.querySelector(".total");
const totalItemsInCart = document.querySelector(".total-items");
let cart = getdata("CART") || [];
let productPromise = makeAPI("products", "GET");

// class UI is responsible for inteface of adding to cart and updating the cart
class UI {
  // addToCart is responsible to add the items to cart array

  addToCart(id) {
    let product = Storage.getProduct(id);
    if (cart === null) {
    } else {
      if (cart.some((item) => item.id === product.id)) {
        this.changeNumberOfUnits("plus", id);
      } else {
        cart.push({ ...product, numberOfUnits: 1 });
      }
      this.updateCart();
    }
  }
  /// updateCart is responsible for calling rendercartItems to display items added to cart and
  // reflect subtotal on screen
  updateCart() {
    this.renderCartItems();
    this.renderSubtotal();
    // storedata("CART", cart);
  }
  // rendersubtotal Method is resposible fo reflecting and doing calculation of price
  renderSubtotal() {
    let totalPrice = 0;
    let totalItems = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.numberOfUnits;
      totalItems += 1;
    });
    subTotalE1.innerHTML = `Rs.${totalPrice.toFixed(2)}`;
    totalItemsInCart.innerHTML = `Items(${cart.length})`;
    if (cart.length === 0) {
      document.getElementById(
        "cartitems"
      ).innerHTML = `<h3>No Item In Cart</h3>`;
    }
    return totalItems;
  }
  //renderCartItems Method is responsible for relfection of diffent products which are added to cart;
  renderCartItems() {
    cartItemsE1.innerHTML = "";
    cart.forEach((item) => {
      let totalItems = 0;
      totalItems += item.numberOfUnits;
      if (item.id == undefined) {
        document.getElementById(
          "cartitems"
        ).innerHTML = `<h2>no item in cart</h2>`;
      } else {
        cartItemsE1.innerHTML += `
          <div class="cart-item">
          <div class="item-info">
            <div class="item-info-desc">
            <img src="${item.imageURL}" alt="apple img" />
            <div class="desc">
            <h4 tabindex="2">${item.name}</h4>
            <div class="units">
              <div class="btn minus" id="minus" tabindex="3" data-id="${
                item.id
              }">-</div>
              <div class="number" tabindex="2">${item.numberOfUnits}</div>
              <div class="btn plus" id="plus" tabindex="4" data-id="${
                item.id
              }">+</div>
              <div>${"X" + " " + "Rs" + item.price}</div>
              <div class="remove-item" tabindex="5" id="remove-item" data-id="${
                item.id
              }")>${"Remove"}</div>
            </div>
           </div>
          </div>
           <div class="price">Rs.${item.price * item.numberOfUnits}</div>
          </div>
        </div>`;
      }
    });
  }
  //removeItemFromCart is responsible for removing the item from cart
  removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    storedata("CART", cart);
    let idForCartPage = getdata("logindetails");
    let cartproduct = getdata("previousdata" + idForCartPage.email);
    cartproduct = cartproduct.filter((item) => item !== id);
    storedata("previousdata" + idForCartPage.email, cartproduct);
    let idOfItem = getdata(idForCartPage.email);
    idOfItem = idOfItem.filter((item) => item !== id);
    storedata(idForCartPage.email, idOfItem);
    this.updateCart();
  }

  changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;

      if (item.id === id) {
        if (action == "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action == "plus" && numberOfUnits < item.stock) {
          numberOfUnits++;
        }
      }

      return {
        ...item,
        numberOfUnits,
      };
    });

    this.updateCart();
  }
}
// class Storage is responsible for storing the data of products;
class Storage {
  static getProduct(id) {
    let products = getdata("PRODUCT");
    return products.find((product) => product.id === id);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  let idForCartPage = getdata("logindetails");
  let idOfItem = getdata(idForCartPage.email) || [];
  productPromise
    .then((products) => {
      storedata("PRODUCT", products);
      idOfItem.forEach((product) => {
        console.log(product);
        ui.addToCart(product);
      });
    })
    .then(() => {
      document.addEventListener("click", function (event) {
        if (event.target && event.target.id == "plus") {
          ui.changeNumberOfUnits("plus", event.target.dataset.id);
        } else if (event.target && event.target.id == "minus") {
          ui.changeNumberOfUnits("minus", event.target.dataset.id);
        } else if (event.target && event.target.id == "remove-item") {
          ui.removeItemFromCart(event.target.dataset.id);
        }
      });
    });
});
let rendertotal = new UI();
let renderSubtotal = rendertotal.renderSubtotal;
export { renderSubtotal };
