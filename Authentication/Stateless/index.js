import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import privateRoutes from './routes/private.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err)); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/auth",authRoutes);
app.use("/",privateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});