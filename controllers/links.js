import { DBModel } from "../model/Postgre/DB_queries.js";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";
function shortUrl(req) {
  const host = req.get("host"); // Nombre de dominio o IP y puerto
  const url = `${host}/link/${uuidv4().slice(0, 8)}`;
  return url;
}

export class Controller {
  static async newUrl(req, res) {
    try {
      const { url } = req.body;
      const { user } = req.body; //|| undefined;
      const data = [user, url, uuidv4().slice(0, 8)];
      await DBModel.postUrl(data);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async redirectUrl(req, res) {
    try {
      const shortUrl = req.params.url;
      const urlData = await DBModel.getUrl(shortUrl);
      console.log(urlData[0]);

      res.redirect(urlData[0].original_url);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUrl(req, res) {
    try {
      const { url } = req.body;
      await DBModel.deleteUrl(url);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
    }
  }
}
