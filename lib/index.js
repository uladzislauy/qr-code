"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server = require("./server");
const app = Server.getConfiguredServer();
/* eslint-disable-next-line no-undef */
app.listen(process.env.PORT || 3000);
