import express from 'express';
import { configViewEngine } from "./config/viewEngine.js";
import { router } from './routes/api.js';
import env from 'dotenv';
import { createJWT, verifyToken } from './middleware/jwtAction.js';
env.config();
const app = express();// app express
const port = process.env.PORT || 8888; // port

//config 
configViewEngine(app);

//test jwt
createJWT();
verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaCIsImFkZHJlc3MiOiJibiIsImlhdCI6MTczNTE3NjIyM30.DvLkpF_mqQ8e-Drz6qWofHEXP_gsgmIapwQWLW7XjeU");

//route
app.use("/", router);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})