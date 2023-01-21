import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../../modules/docs/swagger';
import cors from 'cors';
import * as http from 'http';
import logger from '../../logger/logger';
import { router } from '../../../modules/routes';
import { IServer } from '../server.interface';

export class ServerExpress implements IServer {
  private server: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.server = express();
    this.init();
  }

  init() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(logger);
    this.server.use(router);
    this.server.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  async listen(): Promise<void> {
    try {
      this.httpServer = await this.server.listen(this.port);
      logger.logger.info(`Iniciando la aplicacion en el puerto ${this.port}`);
      logger.logger.info(`http://localhost:${this.port}`);
      logger.logger.info(`http://localhost:${this.port}/explorer`);
    } catch (error) {
      logger.logger.info(error);
      throw error;
    }
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async close(): Promise<void> {
    try {
      if (this.httpServer) {
        await this.httpServer.close();
        console.info('Cerrando la aplicación')
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}