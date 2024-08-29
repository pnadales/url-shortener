import { text } from "express";
import { pool } from "./DBconfig.js";
//User queries

export class DBModel {
  static async getAllUser() {
    const query = {
      text: "SELECT * FROM users",
    };
    const result = await pool.query(query);
    return result.rows;
  }

  static async postUser(data) {
    const query = {
      text: "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      values: data,
    };
    const result = await pool.query(query);
    return result;
  }
  static async getUser(userName) {
    const query = {
      text: `SELECT * FROM users WHERE username=$1`,
      values: [userName],
    };
    const result = await pool.query(query);
    return result.rows[0];
  }

  static async putUser(data) {
    const query = {
      text: "UPDATE users SET username=$2, password=$3 WHERE id=$1 RETURNING *",
      values: data,
    };
    const result = await pool.query(query);
    return result;
  }

  static async deleteUser(id) {
    const query = {
      text: `DELETE FROM users WHERE id=${id} RETURNIG *`,
    };
    const result = await pool.query(query);
    return result;
  }

  //URL queries

  static async getAllUrl() {
    const query = {
      text: "SELECT * FROM urls",
    };
    const result = await pool.query(query);
    return result.rows;
  }
  static async getUrl(url) {
    const query = {
      text: `SELECT * FROM urls WHERE short_url=$1`,
      values: [url],
    };
    const result = await pool.query(query);
    return result.rows;
  }
  static async getUrlsByUser(user) {
    const query = {
      text: "SELECT * FROM urls WHERE user_id=$1",
      values: [user],
    };
    const result = await pool.query(query);
    return result.rows;
  }

  static async postUrl(data) {
    const query = {
      text: "INSERT INTO urls (user_id, original_url, short_url) VALUES ($1, $2, $3) RETURNING *",
      values: data,
    };
    const result = await pool.query(query);
    return result;
  }
  static async UpdateViews(url) {
    const query = {
      text: "UPDATE urls SET  visit_counter= visit_counter+1 WHERE short_url=$1 RETURNING *",
      values: [url],
    };
    const result = await pool.query(query);
    return result;
  }

  static async deleteUrl(url) {
    const query = {
      text: `DELETE FROM urls WHERE short_url=$1 RETURNING *`,
      values: [url],
    };
    const result = await pool.query(query);
    return result;
  }
}
