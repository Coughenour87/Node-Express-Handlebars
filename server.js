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

app.get("/:id", function(req,res) {
    connection.query("SELECT * FROM burgers WHERE id = ?", [req.params.id], function(err, data) {

    })
});

app.post("/", function(req, res) {
    connection.query("", [req.body.burgers], function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});


app.listen(PORT, function() {
    console.log("" + PORT);
});