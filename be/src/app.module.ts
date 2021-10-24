import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
import { AttendanceModule } from './attendance/attendance.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB), UserModule, AuthModule, SubjectModule, ClassModule, AttendanceModule],
})
export class AppModule {}
