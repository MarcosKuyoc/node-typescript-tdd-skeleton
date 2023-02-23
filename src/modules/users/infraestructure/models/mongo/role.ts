import { getModelForClass, prop } from '@typegoose/typegoose';

export class Role {
  @prop({ required: true, trim: true })
    name: string;
}

const RolModel = getModelForClass(Role);
export default RolModel;