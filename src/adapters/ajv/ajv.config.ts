/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { JTDDataType } from 'ajv/dist/core';
import { Logger } from '../logger';
const ajv = new Ajv({allErrors: true});
addFormats(ajv);
addErrors(ajv);

export class ValidatorDto {
  private logger = Logger.getInstance();
  public schema:JSONSchemaType<any>;

  constructor(schema: any) {
    this.schema = schema;
  }

  async validate(data: any) {
    type Data = JTDDataType<typeof this.schema>
    const valid = ajv.compile<Data>(this.schema);

    if (!valid(data)) {
      this.logger.error(`${ValidatorDto.name}, validate`);
      const errors = valid.errors;
      const message = errors?.map((error: any) => {
        return error.message;
      });
      const errorMessage = {
        type: 'validationError',
        message: message,
        status: 400
      }
      throw errorMessage;
    }
    
    return data;
  }
}
