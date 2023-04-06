import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import { schemaCheckHealth } from '../../check-health/controllers/check-health.schema';
import {  ErrorSchema } from '../errors/schemas';
import { UserSchema } from '../../users/domain/shemas';
import { LoginSchema } from '../../auth/domain/schemas/login.schema';
import { SignUpSchema } from '../../auth/domain/schemas/sign-up.schema';

const port = process.env.PORT || '3000'
let url = `http://localhost:${port}`;
let routes = './src/modules/api/routes/*.ts'

if (process.env.NODE_ENV === 'production') {
  url = (process.env.URL_VERCEL) ? process.env.URL_VERCEL : url;
  routes = './src/modules/api/routes/*.js'
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
      checkhealth: schemaCheckHealth,
      signUp: SignUpSchema,
      login: LoginSchema,
      users: UserSchema,
      error400: ErrorSchema
    }
  }
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  basePath: '/',
  apis: [routes],
}

export default swaggerJSDoc(swaggerOptions);


