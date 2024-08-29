//Mostrar clave
const SeePassword = document.getElementById("See-password");
const passwordInput = document.getElementById("password-input");
SeePassword.addEventListener("click", function (e) {
  if (SeePassword.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

const registerForm = document.getElementById("login-form");
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const spinner = document.getElementById("loading");
  spinner.classList.remove("d-none");

  const username = document.getElementById("user-input").value;
  const password = document.getElementById("password-input").value;
  // const ErrorMessage = document.querySelectorAll(".password-error");
  // if (password.value) {
  //   ErrorMessage.forEach((p) => {
  //     p.classList.add("d-none");
  //   });
  // password.style.border = "1px solid #ffffff";
  // password = password.value;
  fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      spinner.classList.add("d-none");
      if (!response.ok) {
        let modal = new bootstrap.Modal(document.getElementById("Login-modal"));
        modal.show();
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("enviado", data);
      setTimeout(() => {
        window.location.href = "/user/dashboard";
      });
    })
    .catch((error) => {
      console.log(error);
    });
  // } else {
  //   password.style.border = "1px solid red";
  //   password2.style.border = "1px solid red";
  //   ErrorMessage.forEach((p) => {
  //     p.classList.remove("d-none");
  //   });
  // }
});
