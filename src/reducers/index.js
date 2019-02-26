import { combineReducers } from 'redux';
import Account from './Account';
import Classes from './Classes';
import ActivityIndicator from './ActivityIndicator';

export default combineReducers({
  activityIndicatorReducer: ActivityIndicator,
  accountReducer: Account,
  classesReducer: Classes
});
