import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const configViewEngine = (app) => {
    //config static files
    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static('public'))

    //req.body Config
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //cors config
    app.use(cors({
        origin: process.env.REACT_URL, // Domain you want to allow
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allowed methods
        allowedHeaders: ['Content-Type', 'X-Requested-With'], // Allowed headers
        credentials: true // You need to website to include cookies in the req sent
    }));

    //config cookie parser
    app.use(cookieParser());
}
export { configViewEngine }