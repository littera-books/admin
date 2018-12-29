import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import controlHeader from './reducer.controlHeader';
import auth from './reducer.auth';
import question from './reducer.question';
import selection from './reducer.selection';
import surveyResult from './reducer.surveyResult';
import product from './reducer.product';
import promotion from './reducer.promotion';
import user from './reducer.user';
import resignSurvey from './reducer.resignSurvey';
import popup from './reducer.popup';
import subscription from './reducer.subscription';

const rootReducer = combineReducers({
  form: formReducer,
  controlHeader,
  auth,
  question,
  selection,
  surveyResult,
  product,
  promotion,
  user,
  resignSurvey,
  popup,
  subscription,
});

export default rootReducer;
