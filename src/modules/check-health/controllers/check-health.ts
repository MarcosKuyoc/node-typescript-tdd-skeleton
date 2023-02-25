import { ICheckHealthService } from '../services/check-health.service';
import { ICheckHealthResponse } from './check-health.interface';

export class CheckHealthController {
  constructor(private service: ICheckHealthService){}

  async find(): Promise<ICheckHealthResponse> {
    const result = await this.service.find();
    return result;
  }
}