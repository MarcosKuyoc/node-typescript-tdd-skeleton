import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../../modules/docs/swagger';
import cors from 'cors';
import * as http from 'http';
import { router } from '../../../modules/routes';
import { IServer } from '../server.interface';
import { DataSources } from '../../datasources/datasources';
import { Logger } from '../../logger';
import { loggerPino } from '../../logger/logger-pino';

export class ServerExpress implements IServer {
  private logger = Logger.getInstance();
  private server: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;
  private datasources: DataSources;

  constructor(port: string) {
    this.port = port;
    this.server = express();
    this.init();
    this.datasources = new DataSources();
  }

  init() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(loggerPino);
    this.server.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.server.use(router);
  }

  async listen(): Promise<void> {
    try {
      this.httpServer = await this.server.listen(this.port);
      await this.datasources.init();
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
        this.logger.info('Cerrando la aplicación')
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}