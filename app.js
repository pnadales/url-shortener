import express from "express";
import { linksRouter } from "./routes/links.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT ?? 4321;

const app = express();
app.use(express.json());
app.disable("x-powered-by");

app.use("/link", linksRouter);

app.get("/", (req, res) => {
  const protocol = req.protocol; // http o https
  const host = req.get("host"); // Nombre de dominio o IP y puerto
  console.log(req.originalUrl);
  const url = `${host}//${req.originalUrl}`;
  res.send(url);
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});
