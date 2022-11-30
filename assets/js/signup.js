
let nameerror = document.getElementById("nameerror");
let lastnameerror = document.getElementById("lastnameerror");
let emailerror = document.getElementById("emailerror");
let passworderror = document.getElementById("passworderror");
let confirmpassworderror = document.getElementById("confirmpassworderror");

let firstnamevalidate = () => {
  let firstname = document.getElementById("first-name").value;
  let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0123456789]+/;
  if (firstname.length < 1) {
    nameerror.innerHTML = "Enter First Name";
    return;
  } else if (format.test(firstname)) {
    nameerror.innerHTML = "name must have alphabets only";
    return;
  } else {
    nameerror.innerHTML = "";
  }
};
document
  .getElementById("first-name")
  .addEventListener("click", firstnamevalidate);

let lastnamevalidate = () => {
  let lastname = document.getElementById("last-name").value;
  let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0123456789]+/;
  if (lastname.length < 1) {
    lastnameerror.innerHTML = "Enter last name";
    document.getElementById("last-name").focus();
    return;
  } else if (format.test(lastname)) {
    lastnameerror.innerHTML = "name must have alphabets only";
    document.getElementById("last-name").focus();
    return;
  } else {
    lastnameerror.innerHTML = "";
  }
};
document
  .getElementById("last-name")
  .addEventListener("click", lastnamevalidate);

let ValidateEmail = () => {
  let emailaddress = document.getElementById("email-address").value;
  let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailaddress.length < 1) {
    emailerror.innerHTML = "Enter email";
    document.getElementById("email-address").focus();
    return;
  } else if (format.test(emailaddress)) {
    emailerror.innerHTML = "";
    return;
  } else {
    emailerror.innerHTML = "invalid email format";
  }
};
document
  .getElementById("email-address")
  .addEventListener("click", ValidateEmail);

let validatepass = () => {
  const password = document.getElementById("password").value;
  let format = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (password.length < 1) {
    passworderror.innerHTML =
      "password atleast 6 character with uppercase,lowercase,number and special symbol";
    return;
  } else if (!format.test(password)) {
    passworderror.innerHTML = "invalid password format";
    return;
  } else {
    passworderror.innerHTML = "";
  }
};
document.getElementById("password").addEventListener("click", validatepass);

let confirmpassword = () => {
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirm-password").value;
  if (confirmpassword < 1) {
    confirmpassworderror.innerHTML = "Re-enter Password";
  } else if (password !== confirmpassword) {
    confirmpassworderror.innerHTML = "Password did not match";
    return;
  } else confirmpassworderror.innerHTML = "";
};
let eyePassword = () => {
  let x = document.getElementById("password");
  let y = document.getElementById("hide1");
  let z = document.getElementById("hide2");
  if (x.type === "password") {
    x.type = "text";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
};

let eyeConfirmPassword = () => {
  let x = document.getElementById("confirm-password");
  let y = document.getElementById("hide3");
  let z = document.getElementById("hide4");
  if (x.type === "password") {
    x.type = "text";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
};
function reset() {
  document.getElementById("myform").reset();
}

success = (event) => {
  event.preventDefault();
  let firstname = document.getElementById("first-name").value;
  let lastname = document.getElementById("last-name").value;
  let email = document.getElementById("email-address").value;
  let password = document.getElementById("password").value;
  let confirmpassword = document.getElementById("confirm-password").value;
  if (
    firstname.length < 1 ||
    lastname.length < 1 ||
    email.length < 1 ||
    password.length < 1 ||
    confirmpassword < 1
  ) {
    alert("All fields are mandatory");
  } else {
    let signUparr=JSON.parse(localStorage.getItem("signupdetails"))||[];
    if (signUparr.some((username) => username.email === email)){
      alert("username allready exist")
      return;
    }else{
    signUparr.push({ "email": email, "password": password });
    localStorage.setItem(
      "signupdetails",
      JSON.stringify(signUparr)
    );
    }
    alert("SignUp Successful!");
    window.location.href = "login.html";
  }
};
