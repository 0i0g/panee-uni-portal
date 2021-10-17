import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  code: string;

  @Prop()
  name: string;

  public constructor(init?: Partial<Subject>) {
    Object.assign(this, init);
  }
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
