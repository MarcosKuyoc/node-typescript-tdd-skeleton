import { getModelForClass, prop } from '@typegoose/typegoose';

export class Role {
  @prop()
    name: string | undefined;
}

const RolModel = getModelForClass(Role);
export default RolModel;