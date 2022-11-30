let ValidateEmail= ()=>{
let emailaddress = document.getElementById("email").value;
let format =   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailaddress.length<1){
    document.getElementById("emailerror").innerHTML = "Enter email";
   return
  }    
  else if(format.test(emailaddress)){
    document.getElementById("emailerror").innerHTML="";
    return
  }
  else{
    document.getElementById("emailerror").innerHTML="invalid email format";
    
  }
}
document.getElementById("email").addEventListener("click",ValidateEmail);




let validatepass=()=>{
    let password = document.getElementById("resetpassword").value;
    let format =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if(password.length<1){
        document.getElementById("passworderror").innerHTML = "password atleast 6 character with uppercase,lowercase,number and special symbol";
        
        return
      }    
    
   else if(!format.test(password)){
            document.getElementById("passworderror").innerHTML="invalid password format";
            
            return
           }
            else{
                document.getElementById("passworderror").innerHTML = ""; 
              }
}
document.getElementById("resetpassword").addEventListener("click",validatepass);


let confirmpassword=()=>{
  
  const password = document.getElementById("resetpassword").value;
  const confirmpassword = document.getElementById("confirm-password").value;
  if (confirmpassword < 1) {
    document.getElementById("confirmpassworderror").innerHTML =
      "Re-enter Password";
  } else if (password !== confirmpassword) {
    document.getElementById("confirmpassworderror").innerHTML =
      "Password did not match";
    return;
  } else confirmpassworderror.innerHTML = "";
};


passwordchanged=(event)=>{
    event.preventDefault()
  let idarray = ["mohit@gmail.com"];
  let email = document.getElementById("email").value;
  for (let i = 0; i < idarray.length; i++) {
     if (email === idarray[i])
    {
      alert("Password reset Successfully!")
    window.location.href="login.html"
    }
 else  {
    alert("User does not exist")
    
  
}
  }
}

let myFunction=()=>{
  let x=document.getElementById("resetpassword");
  let y=document.getElementById("hide1");
  let z=document.getElementById("hide2");
  if(x.type==='password'){
    x.type="text";
    y.style.display="block";
    z.style.display="none";
  }
  else{
    x.type="password";
    y.style.display="none";
    z.style.display="block";
  }
}

let myFunction1=()=>{
  let x=document.getElementById("confirm-password");
  let y=document.getElementById("hide3");
  let z=document.getElementById("hide4");
  if(x.type==='password'){
    x.type="text";
    y.style.display="block";
    z.style.display="none";
  }
  else{
    x.type="password";
    y.style.display="none";
    z.style.display="block";
  }
}

 