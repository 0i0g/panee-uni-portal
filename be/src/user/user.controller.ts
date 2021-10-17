import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserRole } from './dto/update-user-role.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() model: CreateUserDTO) {
    return await this.userService.create(model);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req) {
    return await this.userService.getUser(req.user);
  }

  @Put('role')
  async setRole(@Body() model: UpdateUserRole) {
    return this.userService.setRole(model);
  }
}
