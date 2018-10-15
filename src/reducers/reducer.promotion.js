import _ from 'lodash';
import axiosInstance from './axios.instance';

// Actions
const DETAIL_PROMOTION = 'DETAIL_PROMOTION';

// Action Creators
export const detailPromotion = async (productId) => {
  let response;
  let error;

  try {
    response = await axiosInstance({
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

// Initial State
const initialState = {
  item: {
    id: 0,
    code: '',
  },
  error: '',
};

// Reducer Functions
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

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_PROMOTION:
      return reducerDetailPromotion(state, action);
    default:
      return state;
  }
}
