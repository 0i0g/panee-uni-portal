import React from 'react';
import { useParams } from 'react-router';

const Attendance = () => {
  const { className } = useParams();
  return <div>{className}</div>;
};

export default Attendance;
