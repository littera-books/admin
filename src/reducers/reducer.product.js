import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const LIST_PRODUCT = 'LIST_PRODUCT';

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

// Initial State
const initialState = {
  length: 0,
  items: [],
  item: {},
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

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PRODUCT:
      return reducerListProduct(state, action);
    default:
      return state;
  }
}
