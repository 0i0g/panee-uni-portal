import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useTable } from 'react-table';
import { getCurrentWeek } from '../../helpers/dateHelper';
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../table/table.components';

const TimeTable = ({ className: classN }) => {
  const dateOptions = getCurrentWeek().map((x) => ({
    label: `${x[0]} - ${x[1]}`,
    value: x[0],
  }));
  const [selectedDate, setSelectedDate] = useState(dateOptions[5]);
  const [timeTable, setTimeTable] = useState([]);

  useEffect(() => {
    const loadTimeTable = () => {
      axios
        .get(
          `attendance/studentGetAttendance?date=${moment(
            selectedDate.value,
            'DD/MM/YYYY'
          ).format('YYYY-MM-DD')}`
        )
        .then((res) => {
          console.log(res.data);
          setTimeTable(res.data);
        })
        .catch((err) => console.log(err.message));
    };

    loadTimeTable();
  }, [selectedDate]);

  //   Table
  const columns = useMemo(
    () => [
      {
        Header: 'Slot',
        accessor: 'slot',
      },
      {
        Header: 'MON',
        accessor: 'mon',
      },
      {
        Header: 'TUE',
        accessor: 'tue',
      },
      {
        Header: 'WED',
        accessor: 'wed',
      },
      {
        Header: 'THU',
        accessor: 'thu',
      },
      {
        Header: 'FRI',
        accessor: 'fri',
      },
      {
        Header: 'SAT',
        accessor: 'sat',
      },
      {
        Header: 'SUN',
        accessor: 'sun',
      },
    ],
    []
  );

  const tableDate = useMemo(() => {
    const arr = [
      {
        slot: 'Slot 1',
      },
      {
        slot: 'Slot 2',
      },
      {
        slot: 'Slot 3',
      },
      {
        slot: 'Slot 4',
      },
      {
        slot: 'Slot 5',
      },
      {
        slot: 'Slot 6',
      },
    ];

    for (let i = 0; i < 7; i++) {
      for (const key in timeTable) {
        if (Object.hasOwnProperty.call(timeTable, key)) {
          if (key === i.toString()) {
            let dow = '';
            if (key === '0') {
              dow = 'sun';
            }
            if (key === '1') {
              dow = 'mon';
            }
            if (key === '2') {
              dow = 'tue';
            }
            if (key === '3') {
              dow = 'wed';
            }
            if (key === '4') {
              dow = 'thu';
            }
            if (key === '5') {
              dow = 'fri';
            }
            if (key === '6') {
              dow = 'sat';
            }

            for (const key2 in timeTable[key]) {
              if (Object.hasOwnProperty.call(timeTable[key], key2)) {
                let sl = -1;
                console.log(key2, /^\+?(0|[1-9]\d*)$/.test(key2));
                if (/^\+?(0|[1-9]\d*)$/.test(key2)) {
                  sl = Number.parseInt(key2) - 1;
                }
                if (sl !== -1) {
                  arr[sl][dow] = timeTable[key][key2]?.class;
                  if (timeTable[key][key2]?.attended) {
                    arr[sl][dow] = `+${arr[sl][dow]}`;
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log(arr);
    return arr;
  }, [timeTable]);

  const tableInstance = useTable({ columns, data: tableDate });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <div className="w-64">
        <Select
          value={selectedDate}
          options={dateOptions}
          onChange={(val) => setSelectedDate(val)}
        />
      </div>
      <div>
        <div className={classN}>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHeader
                      {...column.getHeaderProps({
                        className: column.className,
                      })}>
                      {column.render('Header')}
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell, i) => {
                      let className = '';
                      if (i === 0) {
                        className = 'font-bold';
                      }
                      if (i !== 0) {
                        className = 'text-lg font-bold text-indigo-500';
                      }
                      if (cell.value && cell.value.startsWith('+')) {
                        cell.value = cell.value.substring(1);
                        className = 'text-lg font-bold text-green-500';
                      }

                      return (
                        <TableData
                          {...cell.getCellProps()}
                          className={className}>
                          {cell.value}
                        </TableData>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
