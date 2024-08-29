import { DBModel } from "../model/Postgre/DB_queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export class UserController {
  static async getAllUsers(req, res) {
    try {
      const data = await DBModel.getAllUser();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const data = await DBModel.getUser(username);
      const auth = await bcrypt.compare(password, data.password);

      // console.log(hashedPassword + " " + data.password);
      if (auth) {
        const token = jwt.sign(
          { id: data.id, username: username },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res
          .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
          })
          .send({ username });
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async postUser(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
      );
      const data = [username, hashedPassword];
      const result = await DBModel.postUser(data);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  static async dashboard(req, res) {
    const { user } = req.session;
    if (!user) {
      return res.status(403).send("Acceso no permitido");
    }
    const UserLinks = await DBModel.getUrlsByUser(user.id);
    console.log("estos son: " + UserLinks[0]);
    res.render("user", {
      layout: "dashboard",
      title: "Registrarse",
      username: user.username,
      id: user.id,
      Links: UserLinks,
    });
  }
  static async logout(req, res) {
    res.clearCookie("access_token").redirect("/");
  }
}
