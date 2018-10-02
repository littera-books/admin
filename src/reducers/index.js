import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import controlHeader from './reducer.controlHeader';
import auth from './reducer.auth';
import question from './reducer.question';
import selection from './reducer.selection';
import popup from './reducer.popup';

const rootReducer = combineReducers({
  form: formReducer,
  controlHeader,
  auth,
  question,
  selection,
  popup,
});

export default rootReducer;
