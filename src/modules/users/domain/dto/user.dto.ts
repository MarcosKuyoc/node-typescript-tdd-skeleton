import { ValidatorDto } from '../../../../adapters/ajv/ajv.config';
// import { IUserResponse } from '../../controllers/user.interfaces';
import { UserSchema } from '../shemas';

export class CreateUserDto extends ValidatorDto {
  constructor() {
    super(UserSchema);
  }

  // async validate(data: IUserResponse) {
  //   try {
  //     await this.valid(data);
  
  //     return data;
  //   } catch (error) {
  //     console.log('ewe');
  //     throw error;
  //   }
  // }
}