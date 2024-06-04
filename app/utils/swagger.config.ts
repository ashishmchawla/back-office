const swaggerJSDoc = require("swagger-jsdoc")

// swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "The Back Office Api Docs",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",

    contact: {
      name: "the back office",
      url: "#",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
    {
      url: "",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access these api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ["app/**/*.ts"],
}
export const swaggerSpec = swaggerJSDoc(options)
