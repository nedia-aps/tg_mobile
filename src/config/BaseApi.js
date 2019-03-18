import axios from 'axios';
import { Config } from './Config';

import { ActionTypes } from '../utils';
import { store } from '../utils/CommonFunctions';

const baseURL = Config.ROOT_URL;

export default class BaseApi {
  static setDefaults(accessToken) {
    const d = axios.defaults;
    d.baseURL = baseURL;
    if (accessToken) {
      const AUTH_TOKEN = 'Bearer '.concat(accessToken);
      d.headers.common.Authorization = AUTH_TOKEN;
    } else {
      delete d.headers.common.Authorization;
    }
    d.headers.post['Content-Type'] = 'application/json';
    d.headers.post.Accept = 'application/json';
    d.withCredentials = true;
    d.timeout = 10000; // minute in ms
  }

  static transformResponse() {
    return {
      transformResponse: [
        function(data) {
          return data ? JSON.parse(data) : {};
        }
      ]
    };
  }

  static handleException(e) {
    // ex
    console.log('Kan ikke få adgang til dataene', e);
    store.dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: false });
  }

  static handleResponse(callback, response) {
    store.dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: false });
    if (typeof callback === 'function') {
      callback(response);
    }
  }

  static loadingEnable() {
    const me = this;
    store.dispatch({ type: ActionTypes.SET_ISREQUEST_STATE, payload: true });
    me.loadingTimer = setInterval(() => {
      store.dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: true });
      store.dispatch({ type: ActionTypes.SET_ISREQUEST_STATE, payload: false });
      clearInterval(this.loadingTimer);
    }, 300);
  }

  static async get(api, params, callback) {
    const me = this;
    store.dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: true });
    const pparam = Object.assign({ timeout: 10000 }, params);
    await axios
      .get(api, pparam, this.transformResponse())
      .then(response => {
        store.dispatch({
          type: ActionTypes.SET_ISREQUEST_STATE,
          payload: false
        });
        const result = response.data;
        if (response.status !== 200) {
          me.handleException(response);
        } else {
          me.handleResponse(callback, result);
        }
        return true;
      })
      .catch(e => {
        me.handleException(e);
      });
  }

  static async post(api, params, callback) {
    const me = this;
    const pparam = Object.assign({ timeout: 10000 }, params);
    store.dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: true });
    return axios
      .post(api, pparam, this.transformResponse())
      .then(response => {
        const result = response.data;
        if (response.status !== 200) {
          me.handleException(response);
        } else {
          me.handleResponse(callback, result);
        }
        return true;
      })
      .catch(e => {
        me.handleException(e);
      });
  }

  static async put(api, params, callback) {
    const me = this;
    store.dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: true });
    const pparam = Object.assign({ timeout: 10000 }, params);
    await axios
      .put(api, pparam, this.transformResponse())
      .then(response => {
        const result = response.data;
        if (response.status !== 200) {
          me.handleException(response);
        } else {
          me.handleResponse(callback, result);
        }
        return true;
      })
      .catch(e => {
        me.handleException(e);
      });
  }

  static async delete(api, params, callback) {
    const me = this;
    const pparam = Object.assign({ timeout: 10000 }, params);
    store.dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: true });
    await axios
      .delete(api, pparam, this.transformResponse())
      .then(response => {
        const result = response.data;
        if (response.status !== 200) {
          me.handleException(response);
        } else {
          me.handleResponse(callback, result);
        }
        return true;
      })
      .catch(e => {
        me.handleException(e);
      });
  }
}
