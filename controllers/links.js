import { DBModel } from "../model/Postgre/DB_queries.js";
import { v4 as uuidv4 } from "uuid";

export class LinkController {
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
      const resultViews = await DBModel.UpdateViews(shortUrl);

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
  static async urlsByUser(req, res) {
    const { user } = req.session;
    if (!user) {
      return res.status(403).send("Acceso no permitido");
    }
    const result = await DBModel.getUrlsByUser(user.id);
    res.json({ result });
  }
}
