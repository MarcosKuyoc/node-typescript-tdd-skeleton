/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino-http';
 
const transportDev = {
  target: 'pino-pretty',
  options: {
    levelFirst: false,
    translateTime: 'SYS:dd-mm-yyyy HH:mm:ss',
    colorize: true,
    messageKey: 'message',
  },
};

let transportOptions = undefined;

if (process.env.NODE_ENV=== 'development') {
  transportOptions= transportDev;
}
let enabled = true;

if (process.env.NODE_ENV=== 'test' || process.env.LOG_ENABLED === 'false') {
  enabled = false;
}

export const loggerPino = pino({
  enabled,
  transport: transportOptions,
  customProps: function (req: any) {
    return {
      correlationId: req['X-Correlation-Id'],
    }
  },
  genReqId: function (req: any, res: any) {
    if (req.id) return req.id;
    let id = req.get('X-Correlation-Id')
    if (id) return id
    id = uuidv4();
    res.header('X-Correlation-Id', id)
    return id;
  },
  messageKey: 'message',
  autoLogging: true,
  serializers: {
    req: (req) => {
      const result = `[${req.id}] [${req.remoteAddress}] ${req.method} ${req.url}`;
      loggerPino.logger.info(result);
      if (req.method !== 'GET') {
        loggerPino.logger.info({
          payload: req.raw.body
        });
      }
      return undefined;
    },
    res: (res:any) => {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        loggerPino.logger.warn(`Status: ${res.statusCode}`);
        return undefined;
      } else if (res.statusCode >= 500) {
        loggerPino.logger.error(`Status: ${res.statusCode}`);
        return undefined;
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        loggerPino.logger.silent(`Status: ${res.statusCode}`);
        return undefined;
      }

      loggerPino.logger.info(`Status: ${res.statusCode}`);
      return undefined;
    },
  },
  customSuccessMessage: function (req, res) {
    if (res.statusCode === 404) {
      loggerPino.logger.error('resource not found');
      return 'resource not found';
    }
    return `${req.method} ${req.url} completed`
  }
});