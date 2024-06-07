import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import defaults from "../../config/defaults.js";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Artemis | simetrA",
      description: "Interactive API documentation for an E-Commerce store.",
      version: "0.0.1",
      contact: {
        name: "Abeeujah",
        url: "https://github.com/Abeeujah",
        email: "abeeujah@gmail.com",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
      termsOfService: "http://example.com/terms/",
    },
    servers: [
      { url: defaults.dev, description: "Local | Development Server 🚧" },
      { url: defaults.prod, description: "Live Server 🚀" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * @param {Express} app
 */
export async function swaggerDocs(app) {
  // Swagger Route
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Docs JSON export
  app.get("/api/docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  // Log documentation routes
  const routes = options.definition.servers.map(({ url }) => `${url}api/docs`);
  console.log({
    docs: `Docs available on ${routes.join(" ")}`,
    json: `Docs available for export on ${routes
      .map((route) => route + ".json")
      .join(" ")}`,
  });
}
