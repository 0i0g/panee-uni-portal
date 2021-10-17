import { GoogleData } from '../schemas/google-data';

export class AuthUser {
  readonly _id: string;
  readonly picture: string;
  readonly email: string;
  readonly role: string;
}
