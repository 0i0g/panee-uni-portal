import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document, Schema as MonSchema } from 'mongoose';
import { Subject } from 'src/subject/schema/subject.schema';
import { User } from 'src/user/schema/user.schema';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop()
  name: string;

  @Prop({ type: MonSchema.Types.ObjectId, ref: 'Subject' })
  subject: Subject;

  @Prop({ type: MonSchema.Types.ObjectId, ref: 'User' })
  lecturer: User;

  @Prop({ type: [MonSchema.Types.ObjectId], ref: 'User' })
  members: User[];

  @Prop()
  dow: number[];

  @Prop()
  slots: number[];

  @Prop()
  fromDate: Date;

  @Prop()
  toDate: Date;

  @Prop()
  enrollCode: string;

  public constructor(init?: Partial<Class>) {
    Object.assign(this, init);
  }
}

export const ClassSchema = SchemaFactory.createForClass(Class);
