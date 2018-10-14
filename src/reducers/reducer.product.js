import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_PRODUCT = 'LIST_PRODUCT';
const DETAIL_PRODUCT = 'DETAIL_PRODUCT';

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

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PRODUCT:
      return reducerListProduct(state, action);
    case DETAIL_PRODUCT:
      return reducerDetailProduct(state, action);
    default:
      return state;
  }
}
