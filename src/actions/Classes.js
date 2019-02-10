
import { Actions } from 'react-native-router-flux';
import ToastMessage from '../utils/ToasterWrapper';
import { ActionTypes } from '../utils';
import { Config } from '../config/Config';
import BaseApi from '../config/BaseApi';

const { REST_APIs } = Config;

export const formChanged = value => ({
  type: ActionTypes.LOGIN_FORM_CHANGE,
  payload: value,
});
export const logFormChanged = value => ({
  type: ActionTypes.LOG_FORM_CHANGE,
  payload: value,
});
export const setClassTeacherProp = value => ({
  type: ActionTypes.SELECTED_CLASS,
  payload: value,
});
export const get = ({ userId }) => (dispatch) => {
  BaseApi.get(`${REST_APIs.Classes.Get}?userId=${userId}`, null, (response) => {
    const baseModel = response;
    if (!baseModel.success) {
      ToastMessage('Der er opstået en fejl', 'danger');
    } else {
      dispatch({ type: ActionTypes.CLASSES_LIST_GET, payload: baseModel.data });
    }
  });
};
export const saveLog = ({
  TeacherAId,
  Quantity,
  Time,
  ClassesId,
  LogDateTime,
  Hours,
  Minutes,
  Male,
  FeMale,
  Logtype,
}) => (dispatch) => {
  BaseApi.post(
    REST_APIs.Classes.AddLog,
    {
      TeacherAId,
      Quantity,
      Time,
      ClassesId,
      LogDateTime,
      Hours,
      Minutes,
      Male,
      FeMale,
      Logtype,
    },
    (response) => {
      const baseModel = response;
      if (!baseModel.success) {
        ToastMessage('Der er opstået en fejl', 'danger');
      } else {
        ToastMessage('Timer er opdateret', 'success');
        dispatch({ type: ActionTypes.LOG_FORM_RESET });
        Actions.HoldList();
      }
    },
  );
};
export const loadLog = ({ authId, classId }) => (dispatch) => {
  BaseApi.get(
    `${REST_APIs.Classes.GetLog}?TeacherAId=${authId}&classId=${classId}`,
    null,
    (response) => {
      const baseModel = response;
      if (!baseModel.success) {
        ToastMessage('Der er opstået en fejl', 'danger');
      } else {
        dispatch({ type: ActionTypes.LOG_DATA_GET, payload: baseModel.data });
      }
    },
  );
};
export const loadLastLogged = ({ authId, classId, date }) => (dispatch) => {
  BaseApi.get(
    `${REST_APIs.Classes.GetLastLoggedTime
    }?TeacherAId=${
      authId
    }&classId=${
      classId
    }&logDateTime=${
      date}`,
    null,
    (response) => {
      const baseModel = response;
      if (!baseModel.success) {
        ToastMessage('Der er opstået en fejl', 'danger');
      } else {
        dispatch({
          type: ActionTypes.SET_CURRENT_WEEK_LOG,
          payload: baseModel.data,
        });
      }
    },
  );
};
export const cancelClass = ({
  ClassId,
  ClassCancelDate,
  CancelDate,
}) => (dispatch) => {
  BaseApi.post(
    REST_APIs.Classes.CancelClass,
    {
      ClassId,
      ClassCancelDate,
      CancelDate,
    },
    (response) => {
      const baseModel = response;
      if (!baseModel.success) {
        ToastMessage('Der er opstået en fejl', 'danger');
      } else {
        ToastMessage('Timer er opdateret', 'success');
        Actions.HoldList();
      }
    },
  );
};
