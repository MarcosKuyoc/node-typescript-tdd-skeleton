/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loggerPino } from './logger-pino';

export class Logger {
  static instance: any;

  private constructor() {}

  static getInstance(): any {
    try {
      if (Logger.instance) {
        return this.instance;
      }
  
      Logger.instance = loggerPino.logger;
      Logger.instance.info('Create Logger instance');
      return Logger.instance;
    } catch (error) {
      console.error('Ocurrion un error al creal la instancia');
    }
  }
}