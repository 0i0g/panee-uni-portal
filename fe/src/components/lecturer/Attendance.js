import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router';
import Loading from '../Loading';
import AttendanceTable from './AttendanceTable';

const Attendance = ({ className: classN }) => {
  const { className } = useParams();
  const [slots, setSlots] = useState();
  const [data, setData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSlots = () => {
      setLoading(true);
      axios
        .get(
          `class/getSlotsByClassNameAndDate?className=${className}&date=${date.toDateString()}`
        )
        .then((res) => {
          setLoading(false);
          setData(res.data);
          console.log(res.data);
          setSlots(res.data.slots.map((slot) => +slot));
        })
        .catch((err) => {
          setLoading(false);
          setData(null);
        });
    };

    fetchSlots();
  }, [className, date]);

  return (
    <div className={classN}>
      <div className="flex items-center justify-between">
        <div className="flex w-60">
          <ReactDatePicker
            placeholderText="dd/MM/yyy"
            onChange={(v) => setDate(v)}
            selected={date}
            dateFormat="dd/MM/yyyy"
            className="text-center"
          />
          <button
            className="px-2 mx-2 font-bold text-white bg-gray-500 rounded-md"
            onClick={() => setDate(new Date())}>
            Today
          </button>
        </div>
        <div className="flex">
          {Array.isArray(slots) &&
            slots.map((slot) => (
              <button
                className={`w-20 mx-2 font-bold text-white rounded-md h-9 ${
                  selectedSlot == slot
                    ? 'bg-indigo-500'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
                key={slot}
                onClick={() => setSelectedSlot(slot)}>
                🔊 slot {slot}
              </button>
            ))}
        </div>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : data ? (
          <AttendanceTable data={data} className="mt-3" slot={selectedSlot} />
        ) : (
          'Not today'
        )}
      </div>
    </div>
  );
};

export default Attendance;
