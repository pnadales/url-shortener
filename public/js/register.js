//Mostrar clave
const SeePassword = document.getElementById("See-password");
const passwordInput = document.querySelectorAll(
  "#password-input, #password-input-2"
);
SeePassword.addEventListener("click", function (e) {
  if (SeePassword.checked) {
    passwordInput.forEach((input) => {
      input.type = "text";
    });
  } else {
    passwordInput.forEach((input) => {
      input.type = "password";
    });
  }
});

const registerForm = document.getElementById("newUser-form");
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usernameInput = document.getElementById("user-input");
  const username = usernameInput.value;
  const password1 = document.getElementById("password-input");
  const password2 = document.getElementById("password-input-2");
  const ErrorMessage = document.querySelectorAll(".password-error");
  if (password1.value == password2.value) {
    const spinner = document.getElementById("loading");
    spinner.classList.remove("d-none");
    ErrorMessage.forEach((p) => {
      p.classList.add("d-none");
    });
    password1.style.border = "1px solid #ffffff";
    password2.style.border = "1px solid #ffffff";
    const password = password1.value;
    fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        spinner.classList.add("d-none");
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        usernameInput.value = "";
        password1.value = "";
        password2.value = "";
        let modal = new bootstrap.Modal(
          document.getElementById("Register-modal")
        );
        modal.show();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    password.style.border = "1px solid red";
    password2.style.border = "1px solid red";
    ErrorMessage.forEach((p) => {
      p.classList.remove("d-none");
    });
  }
});
