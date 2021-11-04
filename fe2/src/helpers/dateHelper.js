import moment from 'moment';

export const getCurrentWeek = () => {
  const monday = moment().startOf('isoWeek');
  const arr = [];
  const range = 5;
  const date = monday.clone().subtract(range, 'weeks');
  for (let i = 0; i < range * 2 + 1; i++) {
    arr.push([
      date.format('DD/MM/YYYY'),
      date.add(6, 'days').format('DD/MM/YYYY'),
    ]);
    date.add(1, 'day');
  }
  return arr;
};
