import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Role } from './role';

export class User {
  @prop({ required: true, trim: true, unique: true })
    email: string;

  @prop({ required: true, minlength: 6 })
    password!: string;

  @prop({ ref: () => Role })
    roles?: Ref<Role>[];

  // public async encryptPassword(this: DocumentType<User>, password: string) {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}

const UserModel = getModelForClass(User);
export default UserModel;
