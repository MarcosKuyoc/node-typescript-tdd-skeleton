export const ErrorSchema = {
  type: 'object',
  properties: {
    status: { type: 'number' },
    type: { type: 'string' },
    message: { type: 'string' },
  },
  additionalProperties: false
};