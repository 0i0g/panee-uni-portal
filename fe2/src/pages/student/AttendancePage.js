import React, { useState } from 'react';
import ClassList from '../../components/student/ClassList';
import TimeTable from '../../components/student/TimeTable';

const AttendancePage = () => {
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

export default AttendancePage;
