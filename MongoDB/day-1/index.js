import express from 'express';
import { connectDB } from './db.js';
import userRoutes from './routes/user.routes.js';
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/", userRoutes);

// Connect to MongoDB
connectDB();

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, MongoDB with Express!');
}); 
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
