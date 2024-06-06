import { createServer } from "http";
import config from "../config/defaults.js";
import app from "./app.js";
import { mongoConnect } from "./models/mongoose.js";
import { swaggerDocs } from "./docs/swagger.js";

const server = createServer(app);

const PORT = config["port"];

server.listen(PORT, async () => {
  await mongoConnect();

  console.log(`Listening on port ${PORT}`);
  swaggerDocs(app);
});
