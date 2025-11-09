import express from 'express';
import userRouter from './routes/user.route.js';
const app = express();

app.use("/api/v1/users",userRouter)




app.listen(3000,() => {
    console.log("App running at http://localhost:3000")
})