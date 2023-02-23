/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserService } from '..';
import { Logger } from '../../../../adapters/logger';
import { IJWToken, tokenSign } from '../../../../helpers/generateToken';
import { compare } from '../../../../helpers/handleBcrypt';
import { IAuthLoginService, ILogin, ILoginResponse } from '../../controllers/auth';
import { LoginDto } from '../../domain/dto/login.dto';

export class LoginService implements IAuthLoginService {
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
      this.logger.error(`${LoginService.name}, login`);
      this.logger.error(`${error.message}`);
      throw error;
    }
  }
}