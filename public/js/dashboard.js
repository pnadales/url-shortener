const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", function () {
  fetch("/user/logout", {
    method: "POST",
    credentials: "same-origin",
  })
    .then((response) => {
      console.log(response);
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        alert("Sesión cerrada");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const linkForm = document.getElementById("newLink-form");
linkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const urlInput = document.getElementById("url-input");
  const url = urlInput.value;
  const user = document.getElementById("user_id").value;
  const spinner = document.getElementById("loading");
  spinner.classList.remove("d-none");

  fetch("/link/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, user }),
  })
    .then((response) => {
      spinner.classList.add("d-none");
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      urlInput.value = "";
      const host = `${window.location.hostname}:3000`;
      const shortUrl = `${host}/link/${data[2]}`;
      const showUrl = document.getElementById("MiniLink");
      showUrl.innerHTML = shortUrl;
      let modal = new bootstrap.Modal(document.getElementById("Url-modal"));
      modal.show();
    })
    .catch((error) => {
      console.log(error);
    });
});

const copyBtn = document.getElementById("copy");
const copyTooltip = new bootstrap.Tooltip(copyBtn, {
  trigger: "manual",
});
copyBtn.addEventListener("click", function () {
  const copyUrl = document.getElementById("MiniLink").textContent;
  navigator.clipboard
    .writeText(copyUrl)
    .then(() => {
      copyTooltip.show();
    })
    .catch((error) => {
      console.log("error portapapeles", error);
    });
});
