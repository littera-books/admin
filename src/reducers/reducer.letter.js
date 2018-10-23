import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const SEND_LETTER = 'SEND_LETTER';
const GET_COUNT = 'GET_COUNT';
const LIST_LETTER = 'LIST_LETTER';
const DETAIL_LETTER = 'DETAIL_LETTER';

// Action Creators
export const sendLetter = async (userId, payload) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/message/${userId}`,
      method: 'post',
      data: payload,
    });
  } catch (e) {
    error = e;
  }

  return {
    type: SEND_LETTER,
    response,
    error,
  };
};

export const getCount = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/message/${userId}/count`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: GET_COUNT,
    response,
    error,
  };
};

export const listLetter = async (userId, pageNum = 1) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/message/${userId}?page=${pageNum}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_LETTER,
    response,
    error,
  };
};

export const detailLetter = async (payload) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/message/${payload.userId}/${payload.messageId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_LETTER,
    response,
    error,
  };
};

// Initial State
const initialState = {
  count: 0,
  length: 0,
  items: [],
  item: {
    id: 0,
    body: '',
    created_at: 0,
  },
  error: '',
};

// Reducer Functions
const reducerSendLetter = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error,
    });
  }

  return _.assign({}, state, {
    ...state,
    error: '',
  });
};

const reducerGetCount = (state, action) => {
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

const reducerListLetter = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error,
    });
  }

  return _.assign({}, state, {
    ...state,
    length: action.response.data.length,
    items: action.response.data.items,
    error: '',
  });
};

const reducerDetailLetter = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error,
    });
  }

  return _.assign({}, state, {
    ...state,
    item: {
      id: action.response.data.message_id,
      body: action.response.data.body,
      created_at: action.response.data.created_at,
    },
  });
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEND_LETTER:
      return reducerSendLetter(state, action);
    case GET_COUNT:
      return reducerGetCount(state, action);
    case LIST_LETTER:
      return reducerListLetter(state, action);
    case DETAIL_LETTER:
      return reducerDetailLetter(state, action);
    default:
      return state;
  }
}
