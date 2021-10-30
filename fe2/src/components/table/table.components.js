import tw from 'tailwind-styled-components';

export const Table = tw.table`
  w-full
  table-fixed
  text-base
  text-gray-900
`;

export const TableHead = tw.thead`
  p-2
`;

export const TableRow = tw.tr`
  border
  border-green-500
`;

export const TableHeader = tw.th`
  border
  border-green-500
  p-2
`;

export const TableBody = tw.tbody`
`;

export const TableData = tw.td`
  text-center
  border
  border-green-500
  p-5
`;

export const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-green-300
  hover:bg-green-200
  transition-colors
`;
