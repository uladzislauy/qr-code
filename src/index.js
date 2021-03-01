const server = require("./server.js");

const app = server.getConfiguredServer();
app.listen(process.env.PORT || 3000);
