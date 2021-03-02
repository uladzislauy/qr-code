import * as Server from "./server";

const app = Server.getConfiguredServer();
/* eslint-disable-next-line no-undef */
app.listen(process.env.PORT || 3000);
