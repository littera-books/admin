import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_PRODUCT = 'LIST_PRODUCT';
const DETAIL_PRODUCT = 'DETAIL_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DESTROY_PRODUCT = 'DESTROY_PRODUCT';

// Action Creators
export const ListProduct = async () => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: '/product',
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_PRODUCT,
    response,
    error,
  };
};

export const detailProduct = async (productId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/product/${productId}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_PRODUCT,
    response,
    error,
  };
};

export const createProduct = async (payload) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: '/product',
      method: 'post',
      data: {
        months: payload.months,
        price: payload.price,
        description: payload.description,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: CREATE_PRODUCT,
    response,
    error,
  };
};

export const destroyProduct = async (productId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/product/${productId}`,
      method: 'delete',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DESTROY_PRODUCT,
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
    months: 0,
    price: 0,
    description: '',
  },
  error: '',
};

// Reducer Functions
const reducerListProduct = (state, action) => {
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

const reducerDetailProduct = (state, action) => {
  if (action.error) {
    return _.assign({}, state, {
      ...state,
      error: action.error,
    });
  }

  return _.assign({}, state, {
    ...state,
    item: action.response.data,
    error: '',
  });
};

const reducerCRUDProduct = (state, action) => {
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

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PRODUCT:
      return reducerListProduct(state, action);
    case DETAIL_PRODUCT:
      return reducerDetailProduct(state, action);
    case CREATE_PRODUCT:
      return reducerCRUDProduct(state, action);
    case DESTROY_PRODUCT:
      return reducerCRUDProduct(state, action);
    default:
      return state;
  }
}
