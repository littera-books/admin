import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const COUNT_RESIGN = 'COUNT_RESIGN';
const LIST_RESIGN = 'LIST_RESIGN';
const DETAIL_RESIGN = 'DETAIL_RESIGN';

// Action Creators
export const countResign = async () => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: '/survey/resign/count',
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: COUNT_RESIGN,
    response,
    error,
  };
};

export const listResign = async (pageNum) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/survey/resign?page=${pageNum}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_RESIGN,
    response,
    error,
  };
};

export const detailResign = async (surveyId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/survey/resign/${surveyId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_RESIGN,
    response,
    error,
  };
};

// Initial State
const initialState = {
  count: 0,
  items: [],
  item: {
    id: 0,
    content: '',
    created_at: 0,
  },
  error: '',
};

// Reducer Functions
const reducerCountResign = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    count: action.response.data.count,
    error: '',
  });
};

const reducerListResign = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    items: action.response.data.items,
    error: '',
  });
};

const reducerDetailResign = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    item: action.response.data,
    error: '',
  });
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COUNT_RESIGN:
      return reducerCountResign(state, action);
    case LIST_RESIGN:
      return reducerListResign(state, action);
    case DETAIL_RESIGN:
      return reducerDetailResign(state, action);
    default:
      return state;
  }
}
