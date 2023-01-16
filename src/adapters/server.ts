import { ServerExpress } from './server-express';

interface IConfig {
  PORT: string
}

export class Server {
  port: string;

  constructor({PORT}: IConfig) {
    this.port = PORT
  }

  async listen() {
    const server = new ServerExpress(this.port);
    await server.listen();
  }
}