import { DBModel } from "../model/Postgre/DB_queries.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class UserController {
  static async getAllUsuarios(req, res) {
    try {
      const data = await DBModel.getAllUser();
      res.json(data);
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
}
