import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { ClassService } from './class.service';
import { CreateClassDTO } from './dto/create-class.dto';
import { GetClassDTO } from './dto/get-class.dto';
import { UpdateClassDTO } from './dto/update-class.dto';
import { SearchDTO } from './dto/search.dto';
import { EnrollClassDTO } from './dto/enroll-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() model: CreateClassDTO) {
    return await this.classService.create(req.user._id, model);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllOwnedClass(@Req() req) {
    return await this.classService.getAllOwnedClassName(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Query() { name }: GetClassDTO) {
    return await this.classService.get(name);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() model: UpdateClassDTO) {
    return await this.classService.update(model);
  }

  @Get('search')
  async search(@Query() { keyword }: SearchDTO) {
    return await this.classService.search(keyword);
  }

  @UseGuards(JwtAuthGuard)
  @Post('enroll')
  async enroll(@Req() req, @Body() model: EnrollClassDTO) {
    return await this.classService.enroll(req.user._id, model);
  }

  @UseGuards(JwtAuthGuard)
  @Get('enrolled')
  async getEnrolled(@Req() req) {
    return await this.classService.getEnrolled(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('today')
  async getClassToday(@Req() req) {
    return await this.classService.getClassToday(req.user._id);
  }

  // @Get('getSlotsByClassNameAndDate')
  // async getSlotsByClassNameAndDate(@Query() { className, date }) {
  //   return await this.classService.getSlotsByClassNameAndDate(className, date);
  // }

  @Get('getLeturerSlots')
  async getLeturerSlots(@Query() { date }) {
    return await this.classService.getLeturerSlots(date);
  }

  @Get('getStudentInClass')
  async getStudentInClass(@Query() { className }) {
    return await this.classService.getStudentInClass(className);
  }
}
