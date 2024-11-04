const swaggerJsDoc = require("swagger-jsdoc");
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");

const swaggerOptionsV2 = {
  openapi: "3.0.0",
  info: {
    title: "REST API Bank System",
    version: "2.0.0",
    description: "REST API Bank System Documentation",
  },
  servers: [
    {
      url: process.env.BASE_URL,
    },
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Input your Token for Get Access",
      },
    },
  },
  apis: [
    "./src/routes/v2/authRoute.js",
    "./src/routes/v2/userRoute.js",
    "./src/routes/v2/bankAccountRoute.js",
    "./src/routes/v2/transactionRoute.js",
  ],
};

const swaggerDocsV2 = swaggerJsDoc({
  definition: swaggerOptionsV2,
  apis: swaggerOptionsV2.apis,
});

module.exports = swaggerDocsV2;
