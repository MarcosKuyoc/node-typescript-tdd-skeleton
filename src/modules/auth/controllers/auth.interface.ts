import { IUserResponse } from '../../users/controllers/user.interfaces';

export interface ISignUp {
  email: string;
  password: string;
  roles?: string[];
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  data: IUserResponse;
}

export interface ISignUpResponse {
  id: string;
  email: string;
  password: string;
}

export interface IAuthSignUpService {
  signUp(payload: ISignUp): Promise<ISignUpResponse>;
}

export interface IAuthLoginService {
  login(payload: ILogin): Promise<ILoginResponse>;
}