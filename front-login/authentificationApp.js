const userStatus = document.getElementById("user-status");

async function initialUser() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const res = await fetch("http://localhost:3001/user/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const user = await res.json();
  return user;
}

async function initialApp() {
  const user = await initialUser();
  console.log(userStatus);
  if (!user) {
    userStatus.innerHTML = "please Login";
  } else {
    userStatus.innerHTML = `User login - ${user.username}`;
  }
}

initialApp();