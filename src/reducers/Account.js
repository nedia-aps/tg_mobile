import { ActionTypes } from '../utils/ActionTypes';

const { LOGIN_FORM_CHANGED, RESET_FORM_CHANGED } = ActionTypes;
const INITIAL_STATE = {
  error: '',
  email: 'hannerysg@me.com',
  password: 'Fosv@431',
  errorMessage: 'Indtast nyt kodeord'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_FORM_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case RESET_FORM_CHANGED:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
