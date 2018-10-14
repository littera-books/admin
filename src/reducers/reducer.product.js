import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';

// Action Creators
export const getProductList = async () => {
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
    type: GET_PRODUCT_LIST,
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
const reducerGetProductList = (state, action) => {
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

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return reducerGetProductList(state, action);
    default:
      return state;
  }
}
