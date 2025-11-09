import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import session from 'express-session';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret:process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000, secure: false }
}))
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);

connectDB()
.then(() =>{
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
  console.error("Error starting server:", error);
});
