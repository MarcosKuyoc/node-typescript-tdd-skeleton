/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino-http';

export const loggerPino = pino({
  transport: (process.env.NODE_ENV !== 'Production') ?
    {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:dd-mm-yyyy HH:mm:ss',
        colorize: true,
        messageKey: 'message',
      },
    }: undefined,
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
      loggerPino.logger.info({
        request: {
          correlationId: req.id,
          remoteAddress: req.remoteAddress,
          method: req.method,
          url: req.url
        }
      });
      if (req.method !== 'GET') {
        loggerPino.logger.info({
          payload: req.raw.body
        });
      }
      return undefined;
    },
    res: (res:any) => {
      loggerPino.logger.info(`Status: ${res.statusCode}`);
      return undefined;
    },
  },
  customSuccessMessage: function (req, res) {
    if (res.statusCode === 404) {
      return 'resource not found'
    }
    return `${req.method} ${req.url} completed`
  }
});