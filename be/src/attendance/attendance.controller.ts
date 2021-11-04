import { AttendanceService } from './attendance.service';
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('studentGetAttendance')
  async studentGetAttendance(@Req() req, @Query() { date }) {
    return await this.attendanceService.studentGetAttendance(
      req.user._id,
      date,
    );
  }
}
