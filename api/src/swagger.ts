import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Définir les options pour swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API application',
    },
  },
  // Chemins des fichiers contenant les annotations de l'API
  apis: ['./src/routes/*.ts'], // ou .ts si vous utilisez TypeScript
};

// Initialiser swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
