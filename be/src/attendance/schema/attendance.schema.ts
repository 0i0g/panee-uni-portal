import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ strict: false })
export class Attendance {}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
