import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { homeRouter } from "./routes/home.js";
import { linksRouter } from "./routes/links.js";
import { userRouter } from "./routes/user.js";
import { corsMiddleware } from "./middelwares/cors.js";
import { verifyToken } from "./middelwares/token.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT ?? 4321;

const app = express();
app.use(corsMiddleware());
app.use(express.json());
app.use(cookieParser());
app.use(verifyToken);
app.disable("x-powered-by");

app.use(express.static(path.join(process.cwd(), "public")));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/link", linksRouter);
app.use("/user", userRouter);
app.use("/", homeRouter);

// app.get("/", (req, res) => {
//   res.sendStatus
//   res.render("home", {
//     layout: "main",
//     title: "Inicio",
//   });
// });

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});
