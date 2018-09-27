import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import controlHeader from './reducer.controlHeader';
import auth from './reducer.auth';
import survey from './reducer.survey';

const rootReducer = combineReducers({
  form: formReducer,
  controlHeader,
  auth,
  survey,
});

export default rootReducer;
