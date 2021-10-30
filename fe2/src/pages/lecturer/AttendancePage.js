import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import AttendanceTable from '../../components/lecturer/AttendanceTable';

const AttendancePage = () => {
  const [listSlot, setListSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date('2021-10-24'));
  const [selectedClassName, setSelectedClassName] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchListSlot = () => {
      axios
        .get(`class/getLeturerSlots?date=${selectedDate.toDateString()}`)
        .then((res) => {
          if (res.data.length > 0) {
            setListSlot(res.data);
          } else {
            setListSlot(null);
          }
        })
        .catch((err) => {
          setListSlot(null);
        });
    };
    fetchListSlot();
  }, [selectedDate]);

  const selectDate = (
    <div className="w-28">
      <ReactDatePicker
        placeholderText="dd/MM/yyy"
        onChange={(v) => setSelectedDate(v)}
        selected={selectedDate}
        dateFormat="dd/MM/yyyy"
        className="text-center"
      />
    </div>
  );

  return (
    <div>
      {Array.isArray(listSlot) ? (
        <div>
          <div className="flex items-center justify-between">
            <p>
              {`You have ${listSlot.length} ${
                listSlot.length > 1 ? 'classes' : 'class'
              }:`}
            </p>
            {selectDate}
          </div>

          {Array.from(listSlot).map((slot) => (
            <p
              className={`text-blue-500 cursor-pointer hover:text-blue-800${
                selectedClassName === slot.class.name &&
                selectedSlot === slot.slot
                  ? ' link-active-color'
                  : ''
              }`}
              onClick={() => {
                setSelectedClassName(slot.class.name);
                setSelectedSlot(slot.slot);
              }}
              key={`${slot.class.name}-${slot.slot}`}>
              {slot.class.name} - {slot.subject} (slot {slot.slot})
            </p>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p>You do not have any slot</p>
          {selectDate}
        </div>
      )}
      {selectedClassName && selectedSlot && selectedDate ? (
        <AttendanceTable
          className="mt-3"
          nameOfClass={selectedClassName}
          slot={selectedSlot}
          date={selectedDate}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default AttendancePage;
