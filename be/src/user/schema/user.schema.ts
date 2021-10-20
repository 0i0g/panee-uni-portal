import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/constants';
import { GoogleData } from './google-data';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: Role.student })
  role: string;

  @Prop({ type: GoogleData })
  googleData: GoogleData;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
