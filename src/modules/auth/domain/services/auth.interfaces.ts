import { ILogin, ILoginResponse, ISignUp, ISignUpResponse } from '../../controllers';

export interface IAuthSignUpService {
  signUp(payload: ISignUp): Promise<ISignUpResponse>;
}

export interface IAuthLoginService {
  login(payload: ILogin): Promise<ILoginResponse>;
}