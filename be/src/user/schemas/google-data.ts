import { Prop } from '@nestjs/mongoose';

export class GoogleData {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  picture: string;

  @Prop()
  name: string;

  public constructor(init?: Partial<GoogleData>) {
    Object.assign(this, init);
  }
}
