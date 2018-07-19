import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import auth from './auth_reducer';
import user from './user_reducer';
import donation from './donation_reducer';

const rootReducer = combineReducers({
  form,
  auth,
  user,
  donation
});

export default rootReducer;
