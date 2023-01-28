import { Logger } from '../../../adapters/logger';
import { ICheckHealthResponse } from '../controllers/check-health.interface';

export interface ICheckHealthService {
	find: () => Promise<ICheckHealthResponse>;
}

export class CheckHealthService implements ICheckHealthService {
  private logger = Logger.getInstance(); 

  async find (): Promise<ICheckHealthResponse> {
    this.logger.info(`${CheckHealthService.name}, Solictando informacion`)
    return {
      status: 200,
      info: 'CheckHealth Ok!'
    }
  }
}
