import express from 'express';
import taskRoute from "./routes/task.routes.js";
import connectDB from './db.js';

const app = express();
const PORT = 8080;

app.use(express.json());


//connect to MongoDB
connectDB();

//routes
app.get("/",(req,res) => {
    res.send("Welcome to Task Manager")
});


app.use("/task",taskRoute)

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})
