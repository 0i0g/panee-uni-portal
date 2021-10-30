import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import {
  Button,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../table/table.components';
import Loading from '../Loading';

const AttendanceTable = ({ nameOfClass, slot, date, className: classN }) => {
  const [listStudent, setListStudent] = useState([]);
  const [error, setError] = useState(null);
  const [listCheckIn, setListCheckIn] = useState([]); // save list checked
  const [loading, setLoading] = useState(true);

  // table setup
  const initialStateTable = { hiddenColumns: ['_id'] };
  const columns = useMemo(
    () => [
      {
        Header: 'NO',
        accessor: 'no',
        className: 'w-20',
      },
      {
        Header: 'Name',
        accessor: 'googleData.name',
      },
      {
        Header: 'ID',
        accessor: '_id',
      },
    ],
    [listCheckIn]
  );

  //TODO fix first check not working
  const SelectAll = () => {
    return (
      <input
        type="checkbox"
        className="zoom15 checkbox"
        defaultChecked={listCheckIn.length > 0}
        onChange={(event) => {
          if (listCheckIn.length > 0) {
            setListCheckIn([]);
          } else {
            setListCheckIn(listStudent.map((x) => x._id));
          }
        }}
      />
    );
  };

  const checkInAction = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'checkin',
        Header: SelectAll,
        Cell: ({ row }) => {
          row.className = 'p-0';
          return (
            <div className="w-full h-full">
              <input
                type="checkbox"
                className="zoom15 checkbox"
                defaultChecked={listCheckIn.includes(row.values._id)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setListCheckIn((prev) => {
                      return [...prev, row.values._id];
                    });
                  } else {
                    setListCheckIn((prev) =>
                      prev.filter((x) => x != row.values._id)
                    );
                  }
                }}
              />
            </div>
          );
        },
      },
    ]);
  };

  const tableDate = useMemo(() => {
    return listStudent;
  }, [listStudent]);

  // fetch data
  useEffect(() => {
    const fetchStudentInClass = axios.get(
      `class/getStudentInClass?className=${nameOfClass}`
    );

    const fetchAttendance = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('OK');
      }, 500);
    });

    Promise.all([fetchStudentInClass, fetchAttendance])
      .then((results) => {
        let students = results[0].data.members;
        students = Array.from(students).map((x, i) => ({
          no: i + 1,
          ...x,
        }));
        setListStudent(students);
        setLoading(false);
      })
      .catch((err) => {
        setError('Cannot load attendance');
        console.log(err);
      });
  }, [nameOfClass, slot, date]);

  const tableInstance = useTable(
    { columns, data: tableDate, initialState: initialStateTable },
    checkInAction
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const doCheckIn = () => {
    console.log(listCheckIn);
  };

  return loading ? (
    <Loading />
  ) : (
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
                  if (i === 1) {
                    className = 'text-lg font-bold text-indigo-500';
                  }
                  return (
                    <TableData {...cell.getCellProps()} className={className}>
                      {cell.render('Cell')}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-end w-full mt-3">
        <button
          className="right-0 w-20 font-bold text-white bg-green-500 rounded-md h-9 hover:bg-green-600"
          onClick={doCheckIn}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
