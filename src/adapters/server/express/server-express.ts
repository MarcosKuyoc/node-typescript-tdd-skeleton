import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../../modules/docs/swagger';
import cors from 'cors';
import * as http from 'http';
import { router } from '../../../modules/routes';
import { IServer } from '../server.interface';
import {logger as log} from '../../logger/logger';

export class ServerExpress implements IServer {
  private logger = log.logger;
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
    this.server.use(log);
    this.server.use(router);
    this.server.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  async listen(): Promise<void> {
    try {
      this.httpServer = await this.server.listen(this.port);
      this.logger.info(`Iniciando la aplicacion en el puerto ${this.port}`);
      this.logger.info(`http://localhost:${this.port}`);
      this.logger.info(`http://localhost:${this.port}/explorer`);
    } catch (error) {
      this.logger.info(error);
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