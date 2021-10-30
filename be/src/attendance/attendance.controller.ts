import { AttendanceService } from './attendance.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('checkin')
  async checkIn(@Body() { listStudentId, classId, date, slot }) {
    return await this.attendanceService.checkIn(
      listStudentId,
      classId,
      date,
      slot,
    );
  }
}
