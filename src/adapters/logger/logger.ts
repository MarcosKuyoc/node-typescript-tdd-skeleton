/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino-http';

const logger = pino({
  transport:
    process.env.NODE_ENV === 'Development' ?
      {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:dd-mm-yyyy HH:mm:ss',
          colorize: true,
          messageKey: 'message',
        },
      }
      : undefined,
  genReqId: function (req: any, res: any) {
    if (req.id) return req.id;
    let id = req.get('X-Correlation-Id')
    if (id) return id
    id = uuidv4();
    res.header('X-Correlation-Id', id)
    return id;
  },
  messageKey: 'message',
  customProps: function (req: any) {
    return {
      correlationId: req['X-Correlation-Id'],
    }
  },
  autoLogging: false,
  serializers: {
    req: (req) => {
      logger.logger.info({
        request: {
          correlationId: req.id,
          remoteAddress: req.remoteAddress,
          method: req.method,
          url: req.ur
        }
      });
      if (req.method !== 'GET') {
        logger.logger.info({
          payload: req.raw.body
        });
      }
      return undefined;
    },
    res: (res) => {
      logger.logger.info({ status: res.statusCode });
      return undefined;
    },
  }
});


export default logger;
