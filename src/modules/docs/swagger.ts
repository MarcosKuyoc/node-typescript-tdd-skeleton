import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import {schemaCheckHealth} from '../check-health/controllers/check-health.schema';

let url = 'http://localhost:3000';

if (process.env.NODE_ENV === 'Production') {
  url = (process.env.URL_VERCEL) ? process.env.URL_VERCEL : 'http://localhost:3000';
}

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de mi API Base',
    version: '1.0.0',
  },
  servers: [
    {
      url,
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      checkhealth: schemaCheckHealth
    }
  }
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/modules/routes/*.ts'],
}

export default swaggerJSDoc(swaggerOptions);


