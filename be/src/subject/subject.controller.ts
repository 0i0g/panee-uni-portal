import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('all')
  async getAll() {
    return await this.subjectService.getAll();
  }

  @Post()
  async create(@Body() model: CreateSubjectDTO) {
    return await this.subjectService.create(model);
  }
}
