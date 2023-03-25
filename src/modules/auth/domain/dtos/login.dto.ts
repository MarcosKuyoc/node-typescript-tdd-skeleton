import { ValidatorDto } from '../../../../adapters/ajv/ajv.config';
import { LoginSchema } from '../schemas';

export class LoginDto extends ValidatorDto {
  constructor() {
    super(LoginSchema);
  }
}