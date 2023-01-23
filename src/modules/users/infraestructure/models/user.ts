import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Role } from './role';

export class User {
  @prop()
    email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ ref: () => Role })
    role!: Ref<Role>[];

  // public async encryptPassword(this: DocumentType<User>, password: string) {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}

const UserModel = getModelForClass(User);
export default UserModel;
