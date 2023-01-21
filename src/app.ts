import 'dotenv/config';
import { Server } from './adapters/server/server';

export default class App {
  async start() {
    const PORT = process.env.PORT || '3001';

    const server = new Server({PORT});
    await server.bootstrap();   
  }
}
