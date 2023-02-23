import { ValidatorDto } from '../../../../adapters/ajv/ajv.config';
import { LoginSchema } from '../shemas';

export class LoginDto extends ValidatorDto {
  constructor() {
    super(LoginSchema);
  }
}