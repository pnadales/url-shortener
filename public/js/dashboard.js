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
      const host = window.location.hostname;
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
const modalBtn = document.getElementById("modal-btn");
modalBtn.addEventListener("click", function () {
  window.location.href = "/user/dashboard";
});

const host = window.location.hostname;
// const shortUrl = `${host}/link/${data[2]}`;

const shortUrls = document.querySelectorAll(".short-url");
shortUrls.forEach((url) => {
  url.textContent = `${host}/link/${url.textContent}`;
  url.href = `https://${url.textContent}`;
});

const tableCopyBtn = document.querySelectorAll(".copybtn");
tableCopyBtn.forEach((btn) => {
  const tcopyTooltip = new bootstrap.Tooltip(btn, {
    trigger: "manual",
  });
  btn.addEventListener("click", function () {
    // const copyUrl = document.getElementById("MiniLink").textContent;
    const link = `${host}/link/${btn.dataset.link}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        tcopyTooltip.show();
      })

      .catch((error) => {
        console.log("error portapapeles", error);
      });
  });
});

const deleteBtns = document.querySelectorAll(".delete-btn");
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const url = btn.dataset.link;
    fetch("/link/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.text);
        }
      })
      .then((data) => {
        console.log("eliminado");
        window.location.href = "/user/dashboard";
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
