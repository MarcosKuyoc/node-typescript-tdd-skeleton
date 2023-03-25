/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../../../adapters/logger';
import { compare } from '../../../helpers';
import { IJWToken, tokenSign } from '../../../helpers/generateToken';
import { UserService } from '../../users/application/services';
import { ILogin, ILoginResponse } from '../controllers';
import { LoginDto } from '../domain/dtos';
import { IAuthLoginService } from '../domain/services';

export class LoginUseCase implements IAuthLoginService {
  private logger = Logger.getInstance();

  constructor(private userService: UserService) {}
  
  async login(data: ILogin): Promise<ILoginResponse> {
    try {
      const singUpDto = new LoginDto();
      await singUpDto.validate(data);

      const user = await this.userService.findByEmail(data.email);
      
      if (!user) {
        throw new Error(`El usuarion con ${data.email} no existe en nuestros registros`)
      }

      const validateToken = await compare(data.password, user.password);

      if (!validateToken) {
        throw new Error('Contraseña invalida');
      }
      
      const jwtPayload:IJWToken = {
        id: user.id,
        email: user.email,
        roles: user.roles
      };

      const token = await tokenSign(jwtPayload);

      return {
        token,
        data: user
      }

    } catch (error: any) {
      this.logger.error(`${LoginUseCase.name}, login`);
      this.logger.error(`${error.message}`);
      throw error;
    }
  }
}