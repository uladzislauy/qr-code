import path = require("path");
import {Express, Request, Response} from "express";
import * as bodyParser from "body-parser";
import * as qrEncoder from "./qrCodeEncoder";
import * as sanitizeHtml from "sanitize-html";

const express = require("express");

/* eslint-disable-next-line no-undef */
export const viewsPath = path.join(__dirname, "../src/views");

export function getConfiguredServer(): Express {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.set("views", viewsPath);
    app.set("view engine", "pug");

    app.get("/", mainHandler);

    const apiRouter = express.Router();
    apiRouter.get('/qr/:text', getHandler);
    apiRouter.get('/qr/?text', getHandler);
    apiRouter.get('/qr/', getHandler);
    apiRouter.post('/qr', postHandler);

    app.use('/api', apiRouter);

    return app;
}

export function mainHandler(req: Request, res: Response): void {
    const queryText = req.query?.text?.toString();
    let text = queryText || "Hello";

    try {
        const encodedString = qrEncoder.encodeStringToQrCode(text);
        res.render("view", {text: sanitizeHtml(text), base64Image: encodedString});
    } catch (e) {
        console.log(e);
        res.render("view", {text: "An error occurred while encoding the request. Please try another text."});
    }
}

export function getHandler(req: Request, res: Response): void {
    let text = req.params?.text?.toString();
    sendParameterizedResponse(text, res, "Please send Get request to '/api/qr/your_text' to get encoded text");
}

export function postHandler(req: Request, res: Response): void {
    const text = req.body?.text?.toString();
    sendParameterizedResponse(text, res, "Post request should contain 'text' attribute in request body");
}

function sendParameterizedResponse(requestParam: string, response: Response, errorText: string): void {
    if (requestParam) {
        try {
            const encodedString = qrEncoder.encodeStringToQrCode(requestParam);
            response.json({base64Image: encodedString, text: sanitizeHtml(requestParam)});
        } catch (e) {
            console.log(e);
            response.status(400);
            response.send("An error occurred while encoding the request. Please try another text.");
        }
    } else {
        response.status(400);
        response.send(errorText);
    }
}
