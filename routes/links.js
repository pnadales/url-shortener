import { Router } from "express";
import { LinkController } from "../controllers/links.js";

export const linksRouter = Router();

linksRouter.get("/", (req, res) => {
  res.send("Funciona!!!!!!");
  res.sendStatus;
});

linksRouter.post("/new", LinkController.newUrl);
linksRouter.get("/:url", LinkController.redirectUrl);
linksRouter.delete("/", LinkController.deleteUrl);
