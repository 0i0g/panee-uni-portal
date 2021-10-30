import { ClassData } from './class-data.schema';
import { Subject } from './../../subject/schema/subject.schema';
import { User } from '../../user/schema/user.schema';
import { Prop } from '@nestjs/mongoose';
import { Schema as MonSchema } from 'mongoose';

export class SubjectData {
  @Prop({ type: MonSchema.Types.ObjectId, ref: 'Subject' })
  subject: Subject;

  @Prop({ type: ClassData })
  classData: ClassData[];

  public constructor(init?: Partial<SubjectData>) {
    Object.assign(this, init);
  }
}
