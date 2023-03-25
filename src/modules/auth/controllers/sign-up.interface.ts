export interface ISignUp {
  email: string;
  password: string;
  roles?: string[];
}

export interface ISignUpResponse {
  id: string;
  email: string;
  password: string;
}