import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "test",
});

// ------------- Authentication Error Fix -----------------------------
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
// The ALTER USER statement changes the authentication method and password for
// the MySQL user root when connecting  from localhost specifically for the
// connection you create using mysql.createConnection() in your code.
// It does not affect the global configuration of your MySQL server or the
// authentication settings for other MySQL users or connections.
// ------------- Authentication Error Fix -----------------------------

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend successfully...");
});
