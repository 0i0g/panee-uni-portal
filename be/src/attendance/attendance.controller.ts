import { AttendanceService } from './attendance.service';
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Get,
  Query,
} from '@nestjs/common';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('checkin')
  async checkIn(@Body() { listStudentId, className, date, slot }) {
    return await this.attendanceService.checkIn(
      listStudentId,
      className,
      date,
      slot,
    );
  }

  @Get('getAttended')
  async getAttended(@Query() { className, date, slot }) {
    return await this.attendanceService.getAttended(className, date, slot);
  }
}
