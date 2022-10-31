const login = document.querySelector("[data-login-form]");
const username = document.getElementById("username");
const password = document.getElementById("password");
const messageLog = document.querySelector("[data-login-form-message]");

login.addEventListener("submit", async (e) => {
  e.preventDefault();
  const requestBody = {
    username: username.value,
    password: password.value,
  };
  const res = await fetch("http://localhost:3001/user/login" ,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await res.json();
  console.log(data)


  if (data.error) {
    messageLog.innerHTML = data.error;
    messageLog.className = "error-msg";
  } else {
    messageLog.innerHTML = "Login successfully";
    messageLog.className = "success-msg";
    localStorage.setItem('token',data.token)
    console.log("storage token in local storage done")

    window.location.assign(href="../front-eshop/eshop.html");

  }
});



const eyeIcon= document.querySelector("#eye");
eye.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash");
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
})



