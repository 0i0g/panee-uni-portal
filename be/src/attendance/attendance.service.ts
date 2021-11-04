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
import * as moment from 'moment';
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

    if (!classData) {
      // create new class if not exist
      classData = new ClassData({ class: classE._id as any });
      attendance.classData.push(classData);
    }

    // update attended
    classData.attended = [...(listStudentId as any)];

    return (
      (await attendance.updateOne(attendance, { upsert: true })).modifiedCount >
      0
    );
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

  async studentGetAttendance(userId: string, date: Date) {
    const monday = moment(date, 'YYYY-MM-DD').startOf('isoWeek');

    const fromDate = monday.clone();
    const toDate = monday.clone().add(6, 'days');

    const enrolledClass = await this.classService.getEnrolled(userId);

    const timeTable = {};
    enrolledClass.map((x) => {
      Array.from(x.dow).map((d) => {
        if (typeof timeTable[d] === 'undefined') {
          timeTable[d] = {};
        }
        if (typeof timeTable[d].date === 'undefined') {
          if (d === 0) {
            const dateStr = monday
              .clone()
              .subtract(1, 'day')
              .format('YYYY-MM-DD');

            // sunday
            timeTable[d].date = dateStr;
          } else {
            const dateStr = monday
              .clone()
              .add(d - 1, 'day')
              .format('YYYY-MM-DD');

            timeTable[d].date = dateStr;
          }
        }

        Array.from(x.slots).map((s) => {
          if (typeof timeTable[d][s] === 'undefined') {
            timeTable[d][s] = {};
          }
          timeTable[d][s].class = `${x.name} (${x.subject.code})`;
        });
      });
    });

    const attended = await this.attendanceModel.find({
      date: {
        $gte: getLastMidNight(fromDate.toDate()),
        $lte: getLastMidNight(toDate.toDate()),
      },
    });

    const tt = attended.map((att) => ({
      ...att['_doc'],
      date: moment(att.date).format('YYYY-MM-DD'),
    }));

    for (const key in timeTable) {
      if (Object.prototype.hasOwnProperty.call(timeTable, key)) {
        const element = timeTable[key];
        const date = timeTable[key].date;

        for (const key2 in element) {
          if (Object.prototype.hasOwnProperty.call(element, key2)) {
            tt.forEach((t) => {
              if (t.date === date && t.slot.toString() === key2) {
                element[key2].attended = true;
              }
            });
          }
        }
      }
    }

    return timeTable;
  }
}
