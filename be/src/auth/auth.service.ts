import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { GoogleData } from 'src/user/schema/google-data';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  client: OAuth2Client;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.CLIENT_ID);
  }

  async tokenSignin(token) {
    // verify google token
    const ticket = await this.client
      .verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      })
      .then((ticket) => ticket)
      .catch((err) => {
        throw new UnauthorizedException();
      });

    const payload = ticket.getPayload();

    const { sub, email, picture, exp, given_name, family_name } = payload;

    // check existed
    let user = await this.userService.findOneByGoogleId(sub);
    if (!user) {
      // register new user
      user = await this.userService.create({
        googleData: new GoogleData({
          email,
          id: sub,
          name: `${given_name} ${family_name}`,
          picture,
        }),
      });
    }

    // generate token
    const newToken = this.jwtService.sign({
      _id: user._id,
      picture,
      email,
      role: user.role,
    });

    return newToken;
  }
}
