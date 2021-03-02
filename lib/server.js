"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = exports.mainHandler = exports.getConfiguredServer = exports.viewsPath = void 0;
const path = require("path");
const bodyParser = require("body-parser");
const qrEncoder = require("./qrCodeEncoder");
const sanitizeHtml = require("sanitize-html");
const express = require("express");
/* eslint-disable-next-line no-undef */
exports.viewsPath = path.join(__dirname, "../src/views");
function getConfiguredServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.set("views", exports.viewsPath);
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
exports.getConfiguredServer = getConfiguredServer;
function mainHandler(req, res) {
    var _a, _b;
    const queryText = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.toString();
    let text = queryText || "Hello";
    try {
        const encodedString = qrEncoder.encodeStringToQrCode(text);
        res.render("view", { text: sanitizeHtml(text), base64Image: encodedString });
    }
    catch (e) {
        console.log(e);
        res.render("view", { text: "An error occurred while encoding the request. Please try another text." });
    }
}
exports.mainHandler = mainHandler;
function getHandler(req, res) {
    var _a, _b;
    let text = (_b = (_a = req.params) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.toString();
    sendParameterizedResponse(text, res, "Please send Get request to '/api/qr/your_text' to get encoded text");
}
exports.getHandler = getHandler;
function postHandler(req, res) {
    var _a, _b;
    const text = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.toString();
    sendParameterizedResponse(text, res, "Post request should contain 'text' attribute in request body");
}
exports.postHandler = postHandler;
function sendParameterizedResponse(requestParam, response, errorText) {
    if (requestParam) {
        try {
            const encodedString = qrEncoder.encodeStringToQrCode(requestParam);
            response.json({ base64Image: encodedString, text: sanitizeHtml(requestParam) });
        }
        catch (e) {
            console.log(e);
            response.status(400);
            response.send("An error occurred while encoding the request. Please try another text.");
        }
    }
    else {
        response.status(400);
        response.send(errorText);
    }
}
