/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../../../../adapters/logger';
import { IAuthSignUpService, ISignUp, ISignUpResponse } from '../../controllers/auth/auth.interface';
import { SignUpDto } from '../../domain/dto';
import { CreateUserWithRolesService } from '../create-user-with-roles.service';

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