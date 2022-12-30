import express from 'express'
import cors from 'cors';
import * as http from 'http';
import { router } from '../modules/routes';

export class BoostrapExpress {
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
    this.server.use(router);
  }

  async listen(): Promise<void> {
    try {
      this.httpServer = await this.server.listen(this.port);
      console.log(`Iniciando la aplicacion en el puerto ${this.port}`);
    } catch (error) {
      console.error(error);
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