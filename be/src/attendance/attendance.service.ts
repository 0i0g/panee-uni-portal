import { NotFoundError } from 'rxjs';
import { Class, ClassDocument } from './../class/schema/class.schema';
import { SubjectDocument } from './../subject/schema/subject.schema';
import { SubjectService } from './../subject/subject.service';
import { ClassService } from './../class/class.service';
import { ClassData } from './schema/class-data.schema';
import { SubjectData } from './schema/subject-data.schema';
import { getLastMidNight } from './../helper/datetime-helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schema/attendance.schema';
import { Types } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
    private classService: ClassService,
  ) {}

  async checkIn(
    listStudentId: string[],
    className: string,
    date: Date,
    slot: number,
  ) {
    // get date at mid night to save into db
    const _date = getLastMidNight(date);

    // get class document
    const classE = await this.classService.findOne({ name: className });

    if (!classE) throw new NotFoundException();

    // find current attendance
    let attendance = await this.attendanceModel.findOne({
      date: _date,
      slot,
    });

    console.log(`attendance ${attendance}`);

    if (!attendance) {
      // create new attendance if not exist
      attendance = new this.attendanceModel(
        new Attendance({
          date: _date,
          slot,
        }),
      );
    }

    // find current class
    let classData = attendance.classData.find(
      (x) => x.class?.toString() === classE._id.toString(),
    );

    console.log(`classData ${classData}`);

    if (!classData) {
      // create new class if not exist
      classData = new ClassData({ class: classE._id as any });
      attendance.classData.push(classData);
    }

    // update attended
    classData.attended = [...(listStudentId as any)];

    return (await attendance.update(attendance)).modifiedCount > 0;
  }

  async getAttended(className: string, date: Date, slot: number) {
    const attendance = await this.attendanceModel
      .findOne({
        date: getLastMidNight(date),
        slot,
      })
      .populate('classData.class', '_id name', 'Class');

    if (!attendance) return [];

    // return only attended
    return attendance?.classData.find((x) => x.class.name === className)
      .attended;
  }
}
