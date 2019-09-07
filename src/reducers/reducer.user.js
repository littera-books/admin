import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_USER = 'LIST_USER';
const DETAIL_USER = 'DETAIL_USER';
const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
const DELETE_USER = 'DELETE_USER';
const CHECK_USER_LOG = 'CHECK_USER_LOG';

// Action Creators
export const listUser = async () => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: '/user',
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_USER,
    response,
    error,
  };
};

export const detailUser = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/user/${userId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_USER,
    response,
    error,
  };
};

export const toggleActive = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/user/toggle-active/${userId}`,
      method: 'patch',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: TOGGLE_ACTIVE,
    response,
    error,
  };
};

export const deleteUser = async (userId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/user/${userId}?is_admin=true`,
      method: 'delete',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DELETE_USER,
    response,
    error,
  };
};

export const checkUserLog = async (useId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/user/${useId}/check`,
      method: 'post',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: CHECK_USER_LOG,
    response,
    error,
  };
};

// initial State
const initialState = {
  length: 0,
  items: [],
  item: {},
  error: '',
};

// Reducer Functions
const reducerListUser = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    length: action.response.data.length,
    items: action.response.data.items,
    error: '',
  });
};

const reducerDetailUser = (state, action) => {
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

const reducerToggleActive = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    error: '',
  });
};

const reducerDeleteUser = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.message,
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
    case LIST_USER:
      return reducerListUser(state, action);
    case DETAIL_USER:
      return reducerDetailUser(state, action);
    case TOGGLE_ACTIVE:
      return reducerToggleActive(state, action);
    case DELETE_USER:
      return reducerDeleteUser(state, action);
    case CHECK_USER_LOG:
      return reducerToggleActive(state, action);
    default:
      return state;
  }
}
