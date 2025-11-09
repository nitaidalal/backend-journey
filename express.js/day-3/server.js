import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.get("/",(req,res) => {
    res.status(200).send("Hello from server")
})

app.get("/set-cookie",(req,res) => {
    res.cookie("username","Nitai",{httpOnly:true,maxAge:600000});
    res.send("Cookie set");
})

app.get("/get-cookie",(req,res) => {
    res.send(`Hello, ${req.cookies.username} `)
});

app.get("/product",(req,res) => {
    console.log(req.cookies)

    if (req.cookies && req.cookies.username == "Nitai"){
    res.status(200).send({
         name:"Item1",
         price:"1k"
    })
    }else{
        res.status(403).send("you are not authorized bro");
    }
})

app.listen(3000,()=>{
    console.log("Server is running at https://localhost:3000")
});