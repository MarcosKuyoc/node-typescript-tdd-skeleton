/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../../../adapters/logger';
import { CreateUserWithRolesService } from '../../users/services';
import { IAuthSignUpService, ISignUp, ISignUpResponse } from '../controllers';
import { SignUpDto } from '../domain/dto';

export class SignUpService implements IAuthSignUpService {
  private logger = Logger.getInstance();

  constructor(private createUserWithRolesService: CreateUserWithRolesService) {}

  async signUp(data: ISignUp): Promise<ISignUpResponse> {
    try {
      this.logger.info(`${SignUpService.name}, signUp`);
      const singUpDto = new SignUpDto();
      await singUpDto.validate(data);

      return await this.createUserWithRolesService.create(data);
    } catch (error: any) {
      this.logger.error(`${SignUpService.name}, signUp`);
      this.logger.error(`${error.message}`);
      throw error;
    }
  }
}