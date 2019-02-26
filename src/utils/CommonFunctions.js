import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEPT',
  'OCT',
  'NOV',
  'DEC'
];
const days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
export const setSelectedDate = value => {
  const todayDate = value === 0 ? new Date() : value;
  const dayStr = todayDate.getDay();
  const dayNum = todayDate.getDate();
  const month = todayDate.getMonth();
  return `${days[dayStr]} ${dayNum} ${months[month]}`;
};
export const validateDate = (data, dateValue) => {
  const result = data.filter(x => x.date === dateValue);
  if (result !== null) {
    return true;
  }
  return false;
};
export const getDates = (startDate, endDate, data) => {
  const from = new Date(startDate);
  const to = new Date(endDate);
  const objs = {};
  for (let day = from; day <= to; day.setDate(day.getDate() + 1)) {
    const year = day.getFullYear();
    const month = 1 + day.getMonth();
    const m = month > 9 ? month : `0${month}`;
    const currentDay = day.getDate();
    const d = parseInt(currentDay, 10) > 9 ? currentDay : `0${currentDay}`;
    const dateValue = `${year}-${m}-${d}`;
    if (!validateDate(data, dateValue)) {
      objs[dateValue] = { disabled: true, disableTouchEvent: true };
    }
  }
  return objs;
};
export const formateDate = d => {
  let offset = 0;
  if (typeof d === 'string' || d instanceof String) {
    offset = new Date().getTimezoneOffset();
  }
  let fd = new Date(d);
  fd = new Date(fd.getTime() + offset * 60000);
  let dd = fd.getDate();
  let mm = fd.getMonth() + 1; // January is 0!
  const yyyy = fd.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}/${mm}/${yyyy}`;
};

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
