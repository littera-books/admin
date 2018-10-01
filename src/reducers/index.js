import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import controlHeader from './reducer.controlHeader';
import auth from './reducer.auth';
import question from './reducer.question';

const rootReducer = combineReducers({
  form: formReducer,
  controlHeader,
  auth,
  question,
});

export default rootReducer;
