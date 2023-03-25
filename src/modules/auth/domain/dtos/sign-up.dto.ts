import { ValidatorDto } from '../../../../adapters/ajv/ajv.config';
import { SignUpSchema } from '../schemas';

export class SignUpDto extends ValidatorDto {
  constructor() {
    super(SignUpSchema);
  }
}