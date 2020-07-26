const express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost:2717", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("Connected to DB"))
.catch(err => console.log(err));

var app = express();
const PORT = 4200;

app.use(require('express-session')({
    secret: "Go go golang",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});

//Auth Routes
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("secret");
        });
    });
});

app.listen(PORT, "localhost", () => {
    console.log("Server is up on port: " + PORT);
})