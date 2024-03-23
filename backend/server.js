const express = require("express");
const app = express();
const port = 8081;
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE student SET `Name` = ?, `Email` = ? WHERE `student`.`ID` = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, id, (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
