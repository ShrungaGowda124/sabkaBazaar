import { getdata } from "./utility/localstorage.js";
import { storedata } from "./utility/localstorage.js";

(function implementheader() {
  let header = `
  <div class="header-nav">
  <img
    class="header-logo" id="headerlogo"
    src="../static/images/logo.png"
    alt="logo image"
  />
  <div class="link-left">
    <a href="#" id="home" class="link">Home</a>
    <a href="#" id="products" class="link">Products</a>
  </div>
  <div class="header-right">
    <div class="link-right">
    <span id="username"></span>
    <a href=""id="logout"></a>
      <a href="./login.html" id="signin" class="link">SignIn</a>
      <a href="./signup.html" id="signup" class="link">Register</a>
    </div>
    <div class="home-cart" id="homecart">
      <img src=".././static/images/shoppingcart.png" id="carticon"></img>
      <p>Cart</p>
    </div>
  </div>
</div>
    `;
  document.getElementById("header").innerHTML = header;
})();

document.addEventListener("click", function (event) {
  if (
    (event.target && event.target.id === "homecart") ||
    event.target.id === "carticon"
  ) {
    window.location.href = ".././views/cartpage.html";
  } else if (
    (event.target && event.target.id === "home") ||
    event.target.id === "headerlogo"
  ) {
    window.location.href = ".././views/homepage.html";
  } else if (event.target && event.target.id === "products") {
    window.location.href = ".././views/productpage.html";
    localStorage.setItem("idforcategorypage", "All");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let userDetails = getdata("logindetails");
  console.log(userDetails);
  console.log(userDetails.email);

  document.getElementById("logout").addEventListener("click", (event) => {
    storedata("logindetails", { email: "", password: "" });
    document.getElementById("signin").style.display = "block";
    document.getElementById("signup").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("username").style.display = "none";
    window.location.href = ".././views/login.html";
    event.preventDefault();
  });
  if (
    (userDetails.email === "mohit@gmail.com" &&
      userDetails.password === "Mohit@123") ||
    (userDetails.email === "nishkarsh@gmail.com" &&
      userDetails.password === "Verma@1997")
  ) {
    document.getElementById("signin").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("username").innerText = userDetails.email;
    document.getElementById("logout").innerText = "LOGOUT";
  } else if (userDetails) {
    let userdetail = getdata("signupdetails");
    userdetail.forEach((element) => {
      if (
        userDetails.email === element.email &&
        userDetails.password === element.password
      ) {
        document.getElementById("signin").style.display = "none";
        document.getElementById("signup").style.display = "none";
        document.getElementById("username").innerText = element.email;
        document.getElementById("logout").innerText = "LOGOUT";
      }
    });
  }
});
