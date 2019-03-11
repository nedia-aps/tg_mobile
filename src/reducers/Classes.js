import { ActionTypes } from '../utils/ActionTypes';

const {
  LOGIN_FORM_CHANGED,
  CLASSES_LIST_GET,
  SELECTED_CLASS,
  LOG_FORM_CHANGE,
  LOG_FORM_RESET,
  LOG_DATA_GET,
  SET_CURRENT_WEEK_LOG,
  CLASS_DATA
} = ActionTypes;

const INITIAL_STATE = {
  error: '',
  classesList: [],
  seletedClass: {},
  Hrs: 0,
  Mins: 0,
  Male: 0,
  Female: 0,
  totalHours: 0.0,
  progressState: 0.0,
  logged: 0.0,
  LoggedForCurrentWeek: false,
  LoggedDate: null,
  startDate: '',
  endDate: '',
  loggedDatesData: [],
  canceledDatesData: [],
  classData: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_FORM_CHANGED:
      return { ...state, name: action.payload };
    case CLASSES_LIST_GET:
      return { ...state, classesList: action.payload };
    case SELECTED_CLASS: {
      const startDate = new Date(action.payload.startDate);
      const start = `${startDate.getFullYear()}-${`0${startDate.getMonth() +
        1}`.slice(-2)}-${`0${startDate.getDate()}`.slice(-2)}`;
      const endDate = new Date(action.payload.endDate);
      const end = `${endDate.getFullYear()}-${`0${endDate.getMonth() +
        1}`.slice(-2)}-${`0${endDate.getDate()}`.slice(-2)}`;
      return {
        ...state,
        seletedClass: action.payload,
        startDate: start,
        endDate: end
      };
    }
    case LOG_FORM_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOG_FORM_RESET:
      return { ...INITIAL_STATE };
    case LOG_DATA_GET: {
      const total =
        action.payload.logged > 0
          ? Number.parseInt(
              (action.payload.logged / action.payload.totalHours) * 100,
              10
            )
          : 0;
      console.log(
        'action.payload.logged',
        action.payload.logged,
        'progressState:',
        total,
        action.payload.totalHours
      );
      return {
        ...state,
        totalHours: action.payload.totalHours,
        progressState: total,
        logged: action.payload.logged
      };
    }
    case CLASS_DATA: {
      return {
        ...state,
        classData: action.payload.classData
      };
    }
    case SET_CURRENT_WEEK_LOG:
      return {
        ...state,
        Hrs: action.payload.loggedHours / 60,
        Mins: action.payload.loggedMinutes,
        Male: action.payload.loggedMale,
        Female: action.payload.loggedFeMale,
        LoggedForCurrentWeek: action.payload.loggedForCurrentWeek,
        loggedDatesData: action.payload.loggedDatesData,
        canceledDatesData: action.payload.canceledDatesData
      };
    default:
      return state;
  }
};
