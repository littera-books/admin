import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import auth from './reducer.auth';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
});

export default rootReducer;
