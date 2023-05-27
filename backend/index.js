import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

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

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`, `price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("BOOK HAS BEEN CREATED");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(
      "Book has been deleted successfully from the books database."
    );
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ? , `price`=?, `cover` = ? WHERE id = ? ";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(
      "Book has been updated successfully in the database."
    );
  });
});

app.listen(8800, () => {
  console.log("Connected to backend successfully...");
});