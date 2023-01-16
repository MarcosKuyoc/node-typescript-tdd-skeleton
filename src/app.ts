import 'dotenv/config';
import { BoostrapExpress } from './adapters/boostrap-express';

export default class App {
  async start() {
    const PORT = process.env.PORT || '3000';

    const server = new BoostrapExpress(PORT);
    await server.listen();   
  }
}
