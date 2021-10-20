import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { ClassService } from './class.service';
import { CreateClassDTO } from './dto/create-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() model: CreateClassDTO) {
    console.log(JSON.stringify(model, null, 2));

    return await this.classService.create(model);
  }
}
