import { ClassData } from './class-data.schema';
import { SubjectData } from './subject-data.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop()
  date: Date;

  @Prop()
  slot: number;

  @Prop({ type: ClassData, default: [] })
  classData: ClassData[];

  public constructor(init?: Partial<Attendance>) {
    Object.assign(this, init);
  }
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
