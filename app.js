const express = require("express"),
      mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:2717", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("Connected to DB"))
.catch(err => console.log(err));

var app = express();
const PORT = 4200;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});


app.listen(PORT, "localhost", () => {
    console.log("Server is up on port: " + PORT);
})