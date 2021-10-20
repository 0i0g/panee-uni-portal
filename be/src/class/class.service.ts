import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { CreateClassDTO } from './dto/create-class.dto';
import { UpdateClassDTO } from './dto/update-class.dto';
import { Class, ClassDocument } from './schema/class.schema';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async create(userId: string, model: CreateClassDTO) {
    const isExist = await this.classModel.exists({ name: model.name });
    if (isExist) throw new ConflictException('Name of class existed');
    const newClass = new this.classModel({ ...model, lecturer: userId });
    return await newClass.save();
  }

  async getAllOwnedClassName(userId: string) {
    const classes = await this.classModel.find({}, 'name').where({
      lecturer: userId,
    });

    return classes.map((x) => x.name);
  }

  async get(name: string) {
    const classE = await this.classModel.findOne({ name });
    if (!classE) throw new NotFoundException();
    return classE;
  }

  async update(model: UpdateClassDTO) {
    const { _id, ...rest } = model;

    const isExist = await this.classModel.exists({ _id });
    if (!isExist) throw new NotFoundException();

    return await this.classModel.updateOne({ _id }, { $set: { ...rest } });
  }

  async searchClass(keyword: string) {
    // const classList =
    //TODO Search class
  }
}
