"use strict";
import { getdata, storedata } from "./utility/localstorage.js";
let emailerror = document.getElementById("emailerror");
let passworderror = document.getElementById("passworderror");
//validation for emailfield
let emptyemail = () => {
  let emailaddress = document.getElementById("email").value;
  if (emailaddress.length < 1) {
    emailerror.innerHTML = "Enter email";
    return;
  } else {
    emailerror.innerHTML = "";
  }
};
document.getElementById("email").addEventListener("click", emptyemail);
//validation for password
let emptypassword = () => {
  let password = document.getElementById("password").value;
  if (password.length < 1) {
    passworderror.innerHTML = "Enter password";
  } else if (password.length < 6) {
    passworderror.innerHTML = "password have atleast 6 charactor";
  } else {
    passworderror.innerHTML = "";
  }
};
document.getElementById("password").addEventListener("click", emptypassword);
//function for toggle eye
let passwordEye = () => {
  let passwordtype = document.getElementById("password");
  let toggle1 = document.getElementById("hide1");
  let toggle2 = document.getElementById("hide2");
  if (passwordtype.type === "password") {
    passwordtype.type = "text";
    toggle1.style.display = "block";
    toggle2.style.display = "none";
  } else {
    passwordtype.type = "password";
    toggle1.style.display = "none";
    toggle2.style.display = "block";
  }
};
//user details validation for login

let loginsuccess = (event) => {
  event.preventDefault();
  let idarray = ["mohit@gmail.com", "nishkarsh@gmail.com"];
  let passarray = ["Mohit@123", "Verma@1997"];
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let userDetails = { email: email, password: password };
  let flag = true;
  storedata("logindetails", userDetails);
  for (let id = 0; id <= passarray.length; id++) {
    if (email < 1 || password < 1) {
      alert("Fields cannot be empty");
    } else if (email === idarray[id] && password === passarray[id]) {
      alert("Login Successful!");
      flag = flase;
      window.location.href = ".././views/homepage.html";
      return;
    } else if (userDetails) {
      let userdetail = getdata("signupdetails");
      userdetail.forEach((element) => {
        if (element.email === email && element.password === password) {
          flag = false;
          window.location.href = ".././views/homepage.html";
          return;
        }
      });
    }
  }
  if (flag) {
    alert("Invalid Credentials.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginsuccess").addEventListener("click", (event) => {
    loginsuccess(event);
  });
  document.getElementById("eye").addEventListener("click", () => {
    passwordEye();
  });
});
