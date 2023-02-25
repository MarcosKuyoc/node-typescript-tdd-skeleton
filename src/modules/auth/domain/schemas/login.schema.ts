export const LoginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  additionalProperties: false,
  required: ['email', 'password'],
  errorMessage: {
    type: 'should be an properties',
    required: {
      email: 'should have an integer property "email"',
      password: 'should have a string property "password"'
    }
  }
};