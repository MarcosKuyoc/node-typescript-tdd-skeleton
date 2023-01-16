import 'dotenv/config';
import { Server } from './adapters/server';

export default class App {
  async start() {
    const PORT = process.env.PORT || '3000';

    const server = new Server({PORT});
    await server.listen();   
  }
}
