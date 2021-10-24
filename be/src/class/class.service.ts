import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { getLastMidNight } from 'src/helper/datetime-helper';
import { CreateClassDTO } from './dto/create-class.dto';
import { EnrollClassDTO } from './dto/enroll-class.dto';
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
    const fromD = getLastMidNight(model.fromDate);
    const toD = getLastMidNight(model.toDate);

    const newClass = new this.classModel({
      ...model,
      lecturer: userId,
      fromDate: fromD,
      toDate: toD,
    });

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

    const fromD = getLastMidNight(model.fromDate);
    const toD = getLastMidNight(model.toDate);

    return await this.classModel.updateOne(
      { _id },
      { $set: { ...rest, fromDate: fromD, toDate: toD } },
    );
  }

  async search(keyword: string) {
    return await this.classModel
      .find({
        name: { $regex: `.*${keyword}.*` },
      })
      .limit(5);
  }

  async enroll(userId: string, model: EnrollClassDTO) {
    const result = await this.classModel
      .where({
        _id: model.classId,
        enrollCode: model.enrollCode,
        members: { $ne: userId },
      })
      .updateOne({ $push: { members: userId } });

    if (!result.modifiedCount) throw new NotFoundException();
  }

  async getEnrolled(userId: string) {
    const classes = await this.classModel.where({ members: { $in: userId } });
    return classes.map((x) => ({
      classId: x._id,
      name: x.name,
    }));
  }

  // TODO get all class today
  async getClassToday(userId: string) {
    const lastMidNight = getLastMidNight();

    const classes = await this.classModel.where({
      fromDate: { $lte: lastMidNight },
      toDate: { $gte: lastMidNight },
      lecturer: userId,
    });

    return classes;
  }

  async getSlotsByClassNameAndDate(className: string, date: Date) {
    const lastMidNight = getLastMidNight(date);
    const dow = lastMidNight.getDay().toString();

    const classE = await this.classModel
      .where({
        fromDate: { $lte: lastMidNight },
        toDate: { $gte: lastMidNight },
        name: className,
        dow,
      })
      .select('slots members')
      .populate('members', 'googleData.name')
      .findOne();

    if (!classE) throw new NotFoundException();

    return classE;
  }
}
