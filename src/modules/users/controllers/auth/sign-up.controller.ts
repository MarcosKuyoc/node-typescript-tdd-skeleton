import { Logger } from '../../../../adapters/logger';
import { IAuthSignUpService, ISignUp } from './auth.interface';

export class SignUpController {
  private logger = Logger.getInstance();
  constructor(private authService: IAuthSignUpService) {}

  async signUp(payload: ISignUp) {
    this.logger.info(`${SignUpController.name}, signUp`);
    return await this.authService.signUp(payload);
  }
}