const register = document.querySelector("[data-login-form-register]");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const messageReg = document.querySelector("[data-login-form-message-register]");

register.addEventListener("submit", async (e) => {
  e.preventDefault();
  const requestBody = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    email: email.value,
    password: password.value,
    
  };
  const res = await fetch("http://localhost:3001/user/register" ,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await res.json();
  console.log(data)

  if (data.error) {
    messageReg.innerHTML = data.error;
    messageReg.className = "error-msg";
  } else {
    messageReg.innerHTML = "Registor successfully";
    messageReg.className = "success-msg";
    localStorage.setItem('token',data.token)
    console.log("storage token in local storage done")
    window.location.assign(href="../front-login/login.html");
  }
});

const eyeIcon= document.querySelector("#eye");
eye.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash");
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
})