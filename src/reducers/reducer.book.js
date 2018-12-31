import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_BOOK = 'LIST_BOOK';
const CREATE_BOOK = 'CREATE_BOOK';
const DETAIL_BOOK = 'DETAIL_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';

// Action Creators
export const listBook = async (subscriptionId, pageNum) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/book/${subscriptionId}?page=${pageNum}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_BOOK,
    response,
    error,
  };
};

export const createBook = async (subscriptionId, payload) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/book/${subscriptionId}`,
      method: 'post',
      data: {
        name: payload.name,
        order: payload.order,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: CREATE_BOOK,
    response,
    error,
  };
};

export const detailBook = async (subscriptionId, bookId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/book/${subscriptionId}/${bookId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_BOOK,
    response,
    error,
  };
};

export const updateBook = async (subscriptionId, bookId, payload) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/book/${subscriptionId}/${bookId}`,
      method: 'put',
      data: {
        name: payload.name,
        order: payload.order,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: UPDATE_BOOK,
    response,
    error,
  };
};

export const deleteBook = async (subscriptionId, bookId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/book/${subscriptionId}/${bookId}`,
      method: 'delete',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DELETE_BOOK,
    response,
    error,
  };
};

// Initial State
const initialState = {
  length: 0,
  months: 0,
  items: [],
  item: {},
  error: '',
};

// Reducer Functions
const reducerListBook = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    length: action.response.data.length,
    months: action.response.data.months,
    items: action.response.data.items,
  });
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_BOOK:
      return reducerListBook(state, action);
    default:
      return state;
  }
}
