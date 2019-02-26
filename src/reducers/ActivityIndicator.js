import { ActionTypes } from '../utils/ActionTypes';

const { SET_LOADING_STATE, SET_ISREQUEST_STATE } = ActionTypes;

const INITIAL_STATE = {
  isLoading: false,
  isRequest: false
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LOADING_STATE: {
      return { ...state, isLoading: payload };
    }
    case SET_ISREQUEST_STATE: {
      return { ...state, isRequest: payload };
    }
    default: {
      return state;
    }
  }
};
