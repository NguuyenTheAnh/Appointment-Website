import express from 'express';
import { configViewEngine } from "./config/viewEngine.js";
import { router } from './routes/api.js';
import env from 'dotenv';
env.config();
const app = express();// app express
const port = process.env.PORT || 8888; // port

//config 
configViewEngine(app);

//route
app.use("/", router);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})