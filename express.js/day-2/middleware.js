import express from 'express';
const app = express();


// 1.inbuilt middleware
// app.use(express.json())

//2. Golbal middleware
function middleware(req,res,next){
    console.log("i am middleware");
    next()
}

// app.use(middleware)



app.get("/",(req,res) => {
    res.send("hello")
})

//3. specific routes middleware
app.get("/about", middleware, (req, res) => {
  res.send("hello");
});

app.listen(3000,() => {
    console.log("App running at http://localhost:3000")
})