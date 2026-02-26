import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ephec - Gestion des Étudiants",
      version: "1.0.0",
      description: "Documentation de l'API pour la gestion des tags et de l'archivage des membres.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
      },
    ],
  },
  // On cible les fichiers de routes pour extraire les futures annotations
  apis: ["./src/routes/*.ts"], 
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);