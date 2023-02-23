import { ValidatorDto } from '../../../../adapters/ajv/ajv.config';
import { SignUpSchema } from '../shemas';

export class SignUpDto extends ValidatorDto {
  constructor() {
    super(SignUpSchema);
  }
}