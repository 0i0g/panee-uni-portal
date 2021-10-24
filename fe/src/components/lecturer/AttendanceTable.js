import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../table/table.components';

const AttendanceTable = ({ data, className: classN, slot }) => {
  const [listCheckIn, setListCheckIn] = useState(['616b82f1a9d135f03b2c113d']);
  const initialStateTable = { hiddenColumns: ['id'] };
  const columns = useMemo(
    () => [
      {
        Header: 'NO',
        accessor: 'no',
        className: 'w-20',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'ID',
        accessor: 'id',
        show: false,
      },
    ],
    [listCheckIn]
  );

  const getRestData = (data) =>
    Array.from(data.members).map((user, i) => ({
      no: i + 1,
      name: user.googleData.name,
      id: user._id,
    }));

  const SelectAll = () => {
    console.log('render');
    console.log(listCheckIn.length);
    return (
      <input
        type="checkbox"
        className="zoom15"
        defaultChecked={listCheckIn.length > 0}
        onChange={(event) => {
          if (listCheckIn.length > 0) {
            setListCheckIn([]);
          } else {
            setListCheckIn(getRestData(data).map((x) => x.id));
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
                className="zoom15"
                defaultChecked={listCheckIn.includes(row.values.id)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setListCheckIn((prev) => {
                      console.log([...prev, row.values.id]);
                      return [...prev, row.values.id];
                    });
                  } else {
                    setListCheckIn((prev) =>
                      prev.filter((x) => x != row.values.id)
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

  const tableDate = useMemo(() => getRestData(data), [data]);

  const tableInstance = useTable(
    { columns, data: tableDate, initialState: initialStateTable },
    checkInAction
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
        <button className="right-0 w-20 font-bold text-white bg-green-500 rounded-md h-9 hover:bg-green-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;

/**
 * TODO
 * fetch checked in
 * send check in
 */
