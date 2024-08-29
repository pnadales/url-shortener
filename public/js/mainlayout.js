const pageTitle = document.title;
const NavLinks = document.querySelectorAll(".nav-link");
NavLinks.forEach((link) => {
  if (link.textContent == pageTitle) {
    link.classList.add("current");
  }
});
