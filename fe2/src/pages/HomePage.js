import React from 'react';
import authService from '../services/auth.service';
import { Role } from '../helpers/constants';
import StudentAttendancePage from './student/AttendancePage';
import LecturerAttendancePage from './lecturer/AttendancePage';

const HomePage = () => {
  return authService.isRole(Role.lecturer) ? (
    <LecturerAttendancePage />
  ) : (
    <StudentAttendancePage />
  );
};

export default HomePage;
