import { Router } from "express";
import { Controller } from "../controllers/links.js";

export const linksRouter = Router();

linksRouter.get("/", (req, res) => {
  res.send("Funciona!!!!!!");
  res.sendStatus;
});

linksRouter.post("/", Controller.newUrl);
linksRouter.get("/:url", Controller.redirectUrl);
linksRouter.delete("/", Controller.deleteUrl);
