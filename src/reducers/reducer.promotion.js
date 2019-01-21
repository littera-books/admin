import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const CREATE_PROMOTION = 'CREATE_PROMOTION';
const DETAIL_PROMOTION = 'DETAIL_PROMOTION';
const UPDATE_PROMOTION = 'UPDATE_PROMOTION';
const DESTROY_PROMOTION = 'DESTROY_PROMOTION';

// Action Creators
export const createPromotion = async (payload) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: '/promotion',
      method: 'post',
      data: {
        product_id: payload.productId,
        code: payload.code,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: CREATE_PROMOTION,
    response,
    error,
  };
};

export const detailPromotion = async (productId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/product/${productId}/promotion`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_PROMOTION,
    response,
    error,
  };
};

export const updatePromotion = async (payload) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/product/${payload.productId}/promotion`,
      method: 'put',
      data: {
        code: payload.code,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: UPDATE_PROMOTION,
    response,
    error,
  };
};

export const destroyPromotion = async (productId) => {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/product/${productId}/promotion`,
      method: 'delete',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DESTROY_PROMOTION,
    response,
    error,
  };
};

// Initial State
const initialState = {
  item: {
    id: 0,
    code: '',
  },
  error: '',
};

// Reducer Functions
const reducerCreatePromotion = (state, action) => {
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
const reducerDetailPromotion = (state, action) => {
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

const reducerUpdatePromotion = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error.response.data.message,
    });
  }

  return _.assign({}, state, {
    ...state,
    item: action.response.data,
    error: '',
  });
};

const reducerDestroyPromotion = (state, action) => {
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
    case CREATE_PROMOTION:
      return reducerCreatePromotion(state, action);
    case DETAIL_PROMOTION:
      return reducerDetailPromotion(state, action);
    case UPDATE_PROMOTION:
      return reducerUpdatePromotion(state, action);
    case DESTROY_PROMOTION:
      return reducerDestroyPromotion(state, action);
    default:
      return state;
  }
}
