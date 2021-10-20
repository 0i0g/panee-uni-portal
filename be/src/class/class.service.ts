import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassDTO } from './dto/create-class.dto';
import { Class, ClassDocument } from './schema/class.schema';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async create(model: CreateClassDTO) {
    const isExist = this.classModel.findOne({ name: model.name });
    if (isExist) throw new ConflictException('Name of class existed');
    const newClass = new this.classModel(model);
    return await newClass.save();
  }
}
