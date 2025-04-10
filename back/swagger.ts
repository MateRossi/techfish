import swaggerAutogen from "swagger-autogen";

const PORT = 3500;

const doc = {
  info: {
    version: 0.1,
    title: "Tecfish API",
    description: "API de controle e gerenciamento de produção de peixes.",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
  components: {},
};

const outputFile = "./swagger-output.json";
const routes = ["./app.ts"];

swaggerAutogen(outputFile, routes, doc);
