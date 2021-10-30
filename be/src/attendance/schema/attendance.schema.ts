import { SubjectData } from './subject-data.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop()
  date: Date;

  @Prop()
  slot: number;

  @Prop({ type: SubjectData, default: [] })
  subjectData: SubjectData[];

  public constructor(init?: Partial<Attendance>) {
    Object.assign(this, init);
  }
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
