/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import logger from '../logger/logger';
import { JTDDataType } from 'ajv/dist/core';
const ajv = new Ajv({allErrors: true});
addFormats(ajv);
addErrors(ajv);

export class ValidatorDto {
  public schema:JSONSchemaType<any>;

  constructor(schema: any) {
    this.schema = schema;
  }

  async validate(data: any) {
    type Data = JTDDataType<typeof this.schema>
    const valid = ajv.compile<Data>(this.schema);

    if (!valid(data)) {
      logger.logger.error(`${ValidatorDto.name}, validate`);
      throw valid.errors;
    }
    
    return data;
  }
}
