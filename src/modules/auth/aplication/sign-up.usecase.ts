/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../../../adapters/logger';
import { IUserCreateService } from '../../users/domain/services';
import { ISignUp, ISignUpResponse } from '../controllers';
import { SignUpDto } from '../domain/dtos';
import { IAuthSignUpService } from '../domain/services/';

export class SignUpUseCase implements IAuthSignUpService {
  private logger = Logger.getInstance();

  constructor(private createUserWithRolesUseCase: IUserCreateService) {}

  async signUp(data: ISignUp): Promise<ISignUpResponse> {
    try {
      this.logger.info(`${SignUpUseCase.name}, signUp`);
      const singUpDto = new SignUpDto();
      await singUpDto.validate(data);

      return await this.createUserWithRolesUseCase.create(data);
    } catch (error: any) {
      this.logger.error(`${SignUpUseCase.name}, signUp`);
      this.logger.error(`${error.message}`);
      throw error;
    }
  }
}