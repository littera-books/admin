import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_RESULT = 'LIST_RESULT';

// Action Creators
export const listResult = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/survey/result/${userId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_RESULT,
    response,
    error,
  };
};

// Initial State
const initialState = {
  userId: 0,
  length: 0,
  items: [],
  error: '',
};

// Reducer Functions
const reducerListResult = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.response.data.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    userId: action.response.data.id,
    length: action.response.data.length,
    items: action.response.data.items,
    error: '',
  });
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_RESULT:
      return reducerListResult(state, action);
    default:
      return state;
  }
}
