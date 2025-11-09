import express from 'express';
import publicRoutes from "./routes/public.routes.js"
import privateRoutes from "./routes/private.routes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import logMiddleware from './middleware/log.middleware.js';

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//inbuilt
app.use(express.json());

//Globar custom middleware
app.use(logMiddleware)

//Middleware to routes
app.use("/public",publicRoutes)
app.use("/private",privateRoutes)
app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`)
})