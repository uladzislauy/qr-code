const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const qrEncoder = require("./qrCodeEncoder.js");
const sanitizeHtml = require("sanitize-html");

const viewsPath = path.join(__dirname, "views");

function getConfiguredServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

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

function mainHandler(req, res) {
    const queryText = req.query?.text?.toString();
    let text = queryText || "Hello";

    try {
        const encodedString = qrEncoder.encodeStringToQrCode(text);
        res.render("view", { text: sanitizeHtml(text), base64Image: encodedString });
    } catch (e) {
        console.log(e);
        res.render("view", { text: "An error occurred while encoding the request. Please try another text." });
    }
}

function getHandler(req, res) {
    let text = req.params?.text?.toString();
    sendParameterizedResponse(text, res, "Please send Get request to '/api/qr/your_text' to get encoded text");
}

function postHandler(req, res) {
    const text = req.body?.text?.toString();
    sendParameterizedResponse(text, res, "Post request should contain 'text' attribute in request body");
}

function sendParameterizedResponse(requestParam, response, errorText) {
    if (requestParam) {
        try {
            const encodedString = qrEncoder.encodeStringToQrCode(requestParam);
            response.json({ base64Image: encodedString, text: sanitizeHtml(requestParam) });
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

module.exports = {
    getConfiguredServer: getConfiguredServer,
    mainHandler: mainHandler,
    getHandler: getHandler,
    postHandler: postHandler
};
