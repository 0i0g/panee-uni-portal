import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { FilterQuery, Model } from 'mongoose';
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

  findOne(filter: FilterQuery<ClassDocument>) {
    return this.classModel.findOne(filter);
  }

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
    const classes = await this.classModel
      .where({ members: { $in: userId } })
      .populate('subject', 'code name');
    return classes;
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

  // async getSlotsByClassNameAndDate(className: string, date: Date) {
  //   const lastMidNight = getLastMidNight(date);
  //   const dow = lastMidNight.getDay().toString();

  //   const classE = await this.classModel
  //     .where({
  //       fromDate: { $lte: lastMidNight },
  //       toDate: { $gte: lastMidNight },
  //       name: className,
  //       dow,
  //     })
  //     .select('slots members')
  //     .populate('members', 'googleData.name')
  //     .findOne();

  //   if (!classE) throw new NotFoundException();

  //   return classE;
  // }

  async getLeturerSlots(date: Date) {
    const lastMidNight = getLastMidNight(date);
    const dow = lastMidNight.getDay().toString();

    const classes = await this.classModel
      .where({
        fromDate: { $lte: lastMidNight },
        toDate: { $gte: lastMidNight },
        dow,
      })
      .select('slots name')
      .populate('subject', 'name');

    const slots = [];
    classes.map((x) =>
      x.slots.map((y) =>
        slots.push({
          class: { id: x._id, name: x.name },
          subject: x.subject.name,
          slot: +y,
        }),
      ),
    );

    slots.sort((x, y) => x.slot - y.slot);

    return slots;
  }

  async getStudentInClass(className: string) {
    return await this.classModel
      .findOne({ name: className })
      .populate('members', 'googleData');
  }
}
