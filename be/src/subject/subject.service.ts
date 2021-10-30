import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { Subject, SubjectDocument } from './schema/subject.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
  ) {}

  async findOne(filter: FilterQuery<SubjectDocument>) {
    return await this.subjectModel.findOne(filter);
  }

  async getAll() {
    return await this.subjectModel.find({});
  }

  async create(model: CreateSubjectDTO) {
    const isExist = await this.subjectModel.exists({ code: model.code });
    if (isExist) {
      throw new ConflictException();
    }

    return await new this.subjectModel(model).save();
  }
}
