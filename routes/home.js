import { Router } from "express";

export const homeRouter = Router();

homeRouter.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    title: "Inicio",
  });
});

homeRouter.get("/Registro", (req, res) => {
  res.render("register", {
    layout: "main",
    title: "Registrarse",
  });
});

homeRouter.get("/Ingresar", (req, res) => {
  res.render("login", {
    layout: "main",
    title: "Ingresar",
  });
});

homeRouter.get("/About", (req, res) => {
  res.render("about", {
    layout: "main",
    title: "About",
  });
});

homeRouter.get("*", (req, res) => {
  res.send("<h1>404 Page not foud :(</h1>");
});
