/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { JTDDataType } from 'ajv/dist/core';
import {logger as log} from '../logger/logger';
const ajv = new Ajv({allErrors: true});
addFormats(ajv);
addErrors(ajv);

export class ValidatorDto {
  private logger = log.logger;
  public schema:JSONSchemaType<any>;

  constructor(schema: any) {
    this.schema = schema;
  }

  async validate(data: any) {
    type Data = JTDDataType<typeof this.schema>
    const valid = ajv.compile<Data>(this.schema);

    if (!valid(data)) {
      this.logger.error(`${ValidatorDto.name}, validate`);
      throw valid.errors;
    }
    
    return data;
  }
}
