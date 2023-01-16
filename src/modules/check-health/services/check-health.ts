import { ICheckHealthResponse } from '../controllers/check-health.interface';

export interface ICheckHealthService {
	find: () => Promise<ICheckHealthResponse>;
}

export class CheckHealthService implements ICheckHealthService {
  async find (): Promise<ICheckHealthResponse> {
    return {
      status: 200,
      info: 'CheckHealth Ok!'
    }
  }
}
