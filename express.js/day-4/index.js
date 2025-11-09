// session and cookies


import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
const app = express();

app.use(session({
    secret:"mysecret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:10000*60*60
    }
}))
app.use(cookieParser("nitai"))

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);

  res.send("Hello World");
});

app.get("/login", (req,res) => {
    req.session.user = {
        name:"Nitai",
        age:21
    }
    res.send(`${req.session.user.name} logged in`)
})

//delete session
app.get("/logout", (req,res) => {
    req.session.destroy();
    res.send("logged out")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});