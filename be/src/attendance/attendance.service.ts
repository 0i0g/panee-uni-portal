import { ClassDocument } from './../class/schema/class.schema';
import { SubjectDocument } from './../subject/schema/subject.schema';
import { SubjectService } from './../subject/subject.service';
import { ClassService } from './../class/class.service';
import { ClassData } from './schema/class-data.schema';
import { SubjectData } from './schema/subject-data.schema';
import { getLastMidNight } from './../helper/datetime-helper';
import { Injectable } from '@nestjs/common';
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
    private subjectService: SubjectService,
  ) {}

  async checkIn(
    listStudentId: string[],
    classId: string,
    date: Date,
    slot: number,
  ) {
    // get date at mid night to save into db
    const _date = getLastMidNight(date);

    // get class and subject
    const classE = await this.classService
      .findOne({ _id: classId })
      .populate('subject', '_id');

    // find current attendance
    let attendance = await this.attendanceModel.findOne({
      date: _date,
      slot,
    });

    if (!attendance) {
      // create new attendance if not exist
      attendance = new this.attendanceModel(
        new Attendance({
          date: _date,
          slot,
          subjectData: [],
        }),
      );
    }

    if (
      attendance.subjectData.filter(
        (x) =>
          (x.subject as SubjectDocument)._id?.toString() ===
          (classE.subject as SubjectDocument)._id?.toString(),
      ).length === 0
    ) {
      // create new subject data if not exist
      attendance.subjectData.push(
        new SubjectData({
          subject: (classE.subject as SubjectDocument)._id,
          classData: [],
        }),
      );
    }

    // find current subject
    const subjectDataE = attendance.subjectData.find(
      (x) =>
        (x.subject as SubjectDocument)._id?.toString() ===
        (classE.subject as SubjectDocument)._id?.toString(),
    );

    if (
      subjectDataE.classData.filter(
        (x) => (x.class as ClassDocument)._id?.toString() === classId,
      ).length === 0
    ) {
      // create new class if not exist
      subjectDataE.classData.push(
        new ClassData({
          class: new Types.ObjectId(classId) as any,
          attended: [],
        }),
      );
      console.log(JSON.stringify(subjectDataE, null, 2));
    }

    // find current class and update attended
    subjectDataE.classData.find(
      (x) => (x.class as ClassDocument)._id?.toString() == classId,
    ).attended = [...(listStudentId as any)];

    return await attendance.save();
  }
}
