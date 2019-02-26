import { SecureStore } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Config } from '../config/Config';
import BaseApi from '../config/BaseApi';
import { ActionTypes } from '../utils';
import ToastMessage from '../utils/ToasterWrapper';

// eslint-disable-next-line
const { REST_APIs, ROOT_URL } = Config;

export const formChanged = value => ({
  type: ActionTypes.LOGIN_FORM_CHANGED,
  payload: value
});
export const oldPasswordError = value => ({
  type: ActionTypes.RESET_FORM_CHANGED,
  payload: value
});
export const login = ({ email, password, token }) => () => {
  // dispatch
  BaseApi.post(
    ROOT_URL + REST_APIs.Account.Login,
    {
      UserName: email.trim(),
      Password: password,
      token
    },
    response => {
      const baseModel = response;
      console.log(response);
      if (!baseModel.success) {
        ToastMessage(baseModel.message, 'danger');
      } else {
        SecureStore.setItemAsync('userInfo', JSON.stringify(baseModel.data));
        Actions.HoldList();
      }
    }
  );
};
export const changePassword = ({
  TeacherId,
  oldPassword,
  newPassword
}) => dispatch => {
  BaseApi.post(
    REST_APIs.Account.ResetPassword,
    {
      TeacherId,
      oldPassword,
      newPassword
    },
    response => {
      const baseModel = response;
      if (!baseModel.success) {
        dispatch({
          type: ActionTypes.LOGIN_FORM_CHANGED,
          payload: baseModel.message
        });
      } else {
        SecureStore.deleteItemAsync('userInfo');
        Actions.Login({ type: 'reset' });
      }
    }
  );
};
