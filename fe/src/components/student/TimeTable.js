import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useTable } from 'react-table';
import Loading from '../Loading';
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../table/table.components';

const TimeTable = ({ subject, date }) => {
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState([]);

  const loadTimes = async (subject, date) => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        console.log(res.data);
        setTimes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setTimes([]);
      });
  };

  useEffect(() => {
    loadTimes();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
    ],
    []
  );

  const timesData = useMemo(() => [...times], [times]);

  const tableInstance = useTable({ columns, data: timesData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  //   useEffect(() => {
  //     setTimes(data);
  //   }, []);
  //   const timesData = useMemo(() => [...times], [times]);

  //   const timesColumns = useMemo(
  //     () =>
  //       times[0]
  //         ? Object.keys(times[0])
  //             .filter((key) => key !== 'rating')
  //             .map((key) => {
  //               if (key === 'image')
  //                 return {
  //                   Header: key,
  //                   accessor: key,
  //                   Cell: ({ value }) => <img src={value} />,
  //                   maxWidth: 70,
  //                 };

  //               return { Header: key, accessor: key };
  //             })
  //         : [],
  //     [times]
  //   );

  //   const tableInstance = useTable({
  //     columns: timesColumns,
  //     data: timesData,
  //   });

  //   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //     tableInstance;

  //   const isEven = (idx) => idx % 2 === 0;

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps()}>
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
    </div>
  );
};

export default TimeTable;
