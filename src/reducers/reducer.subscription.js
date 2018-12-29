import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_SUBSCRIPTION = 'LIST_SUBSCRIPTION';

// Action Creators
export const listSubscription = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/subscription/${userId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_SUBSCRIPTION,
    response,
    error,
  };
};

// Initial State
const initialState = {
  length: 0,
  items: [],
  item: {},
  error: '',
};

// Reducer Functions
const reducerListSubscription = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.response.data.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    length: action.response.data.length,
    items: action.response.data.items,
  });
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_SUBSCRIPTION:
      return reducerListSubscription(state, action);
    default:
      return state;
  }
}
