import express from 'express';
import session from 'express-session';
import authRoute from './routes/auth.routes.js';
import taskRoute from "./routes/task.routes.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(session({
    secret:"mysecrectkey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:24*60*60*1000 //1 day
    }
}))

//routes
app.get("/",(req,res) => {
    res.send("Welcome to Task Manager")
});


app.use("/auth",authRoute)
app.use("/task",taskRoute)

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})
