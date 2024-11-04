const swaggerJsDoc = require("swagger-jsdoc");
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");

const swaggerOptionsV1 = {
  openapi: "3.0.0",
  info: {
    title: "REST API Bank System",
    version: "1.0.0",
    description: "REST API Bank System Documentation Version 1",
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
    "./src/routes/v1/authRoute.js",
    "./src/routes/v1/userRoute.js",
    "./src/routes/v1/bankAccountRoute.js",
    "./src/routes/v1/transactionRoute.js",
  ],
};

const swaggerDocsV1 = swaggerJsDoc({
  definition: swaggerOptionsV1,
  apis: swaggerOptionsV1.apis,
});

module.exports = swaggerDocsV1;
