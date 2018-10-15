import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const SEND_LETTER = 'SEND_LETTER';
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

export const listLetter = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/message/${userId}`,
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
    case LIST_LETTER:
      return reducerListLetter(state, action);
    case DETAIL_LETTER:
      return reducerDetailLetter(state, action);
    default:
      return state;
  }
}
