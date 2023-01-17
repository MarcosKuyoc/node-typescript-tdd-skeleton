import pino from 'pino-http';
import {Request} from 'express';

let logger = pino();
if (process.env.NODE_ENV === 'Development') {
  logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:dd-mm-yyyy HH:mm:ss',
        colorize: true,
        messageKey: 'message'
      }
    },
    messageKey: 'message',
    serializers: {
      req: (req: Request) => {
        return `${req.method} ${req.url}`
      },
    }
  });
}

export default logger;