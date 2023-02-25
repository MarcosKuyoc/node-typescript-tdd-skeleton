
import { Logger } from '../../../adapters/logger';
import { IAuthLoginService, ILogin } from './auth.interface';

export class LoginController {
  private logger = Logger.getInstance();
  constructor(private authService: IAuthLoginService) {}

  async login(payload: ILogin) {
    this.logger.info(`${LoginController.name}, login`);
    return await this.authService.login(payload);
  }
}