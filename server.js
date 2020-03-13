// Server.js - This file is the initial starting point for the Node/Express server.

// Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Daphne93!",
  database: "burgers"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
        return res.status(500).end();
    }

    res.render("index", { burgers: data });
    });
});

app.get("/api/burgers", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.json(data);
    });
  });

app.put("/api/burger/:id", function(req,res) {
    const id = req.params.id
    connection.query("UPDATE burgers SET devoured=?  WHERE id = ?", [1,id], function(err, data) {
        if(err){
            res.sendStatus(418)
            console.log(err)
            return
        }
        res.sendStatus(200)
    })
});

app.post("/api/burgers", function(req, res) {
    connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });


app.listen(PORT, function() {
    console.log("Listening on: http://localhost:" + PORT);
});