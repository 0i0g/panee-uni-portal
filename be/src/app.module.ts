import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB), UserModule, AuthModule, SubjectModule, ClassModule],
})
export class AppModule {}
