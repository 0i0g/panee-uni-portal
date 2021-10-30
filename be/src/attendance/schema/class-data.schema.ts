import { Class } from './../../class/schema/class.schema';
import { User } from '../../user/schema/user.schema';
import { Prop } from '@nestjs/mongoose';
import { Schema as MonSchema } from 'mongoose';

export class ClassData {
  @Prop({ type: MonSchema.Types.ObjectId, ref: 'Class' })
  class: Class;

  @Prop({ type: MonSchema.Types.ObjectId, ref: 'User' })
  attended: User[];

  @Prop({ type: MonSchema.Types.ObjectId, ref: 'User' })
  not_attended: User[];

  public constructor(init?: Partial<ClassData>) {
    Object.assign(this, init);
  }
}
