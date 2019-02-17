import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_SUBSCRIPTION = 'LIST_SUBSCRIPTION';
const DETAIL_SUBSCRIPTION = 'DETAIL_SUBSCRIPTION';
const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';

// Action Creators
export const listSubscription = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
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

export const detailSubscription = async (userId, subscriptionId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/subscription/${userId}/${subscriptionId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_SUBSCRIPTION,
    response,
    error,
  };
};

export const deleteSubscription = async (userId, subscriptionId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/subscription/${userId}/${subscriptionId}`,
      method: 'delete',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DELETE_SUBSCRIPTION,
    response,
    error,
  };
};

// Initial State
const initialState = {
  length: 0,
  items: [],
  item: {
    product: {
      books: 0,
      months: 0,
    },
  },
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

const reducerDetailSubscription = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.response.data.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    item: action.response.data,
  });
};

const reducerDeleteSubscription = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.response.data.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    error: '',
  });
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_SUBSCRIPTION:
      return reducerListSubscription(state, action);
    case DETAIL_SUBSCRIPTION:
      return reducerDetailSubscription(state, action);
    case DELETE_SUBSCRIPTION:
      return reducerDeleteSubscription(state, action);
    default:
      return state;
  }
}
