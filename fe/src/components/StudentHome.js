import React, { useState } from 'react';
import { getCurrentWeek } from '../helper/dateHelper';
import ClassList from './student/ClassList';
import TimeTable from './student/TimeTable';

const StudentHome = () => {
  const [classSelected, setClassSelected] = useState(null);
  const [dateSelected, setDateSelected] = useState(null);
  return (
    <div>
      <ClassList
        classSelected={classSelected}
        setClassSelected={setClassSelected}
      />
      <TimeTable />
    </div>
  );
};

export default StudentHome;
