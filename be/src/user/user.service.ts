import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { OAuth2Client } from 'google-auth-library';
import { UpdateUserRole } from './dto/update-user-role.dto';
import { Role } from 'src/constants';
import { AuthUser } from './dto/auth-user';

@Injectable()
export class UserService {
  private client: OAuth2Client;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.client = new OAuth2Client(process.env.CLIENT_ID);
  }

  async create(model: CreateUserDTO) {
    const user = new this.userModel(model);
    return await user.save();
  }

  async findOneByGoogleId(googleId: string) {
    return await this.userModel.findOne({ 'googleData.id': googleId });
  }

  async setRole(model: UpdateUserRole) {
    const roles = Object.keys(Role).map((x) => Role[x]);
    console.log(roles);
    if (!roles.includes(model.role)) {
      const rolesStr = roles.map((x) => `'${x}'`).join(', ');
      throw new UnprocessableEntityException(`Role must be [${rolesStr}]`);
    }

    const { email, role } = model;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    user.role = role;
    return await user.save();
  }

  async getUser(model: AuthUser) {
    const user = await this.userModel.findOne({ _id: model._id });
    if (!user) throw new NotFoundException();

    const { _id, googleData, role } = user;
    return { _id, role, ...googleData };
  }
}
