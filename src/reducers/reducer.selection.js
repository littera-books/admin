import _ from 'lodash';
import AxiosInstance from './axios.instance';

// Actions
const LIST_SELECTION = 'LIST_SELECTION';
const CREATE_SELECTION = 'CREATE_SELECTION';
const UPDATE_SELECTION = 'UPDATE_SELECTION';
const DESTROY_SELECTION = 'DESTROY_SELECTION';

// Action Creators
export async function listSelection(questionId) {
  let response;
  let error;

  try {
    response = await AxiosInstance()({
      url: `/survey/question/${questionId}/selection`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_SELECTION,
    response,
    error,
  };
}

export async function createSelection(payload) {
  let response;
  let error;

  try {
    response = await AxiosInstance()({
      url: `/survey/question/${payload.questionId}/selection`,
      method: 'post',
      data: {
        select: payload.createSelect,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: CREATE_SELECTION,
    response,
    error,
  };
}

export async function updateSelection(payload) {
  let response;
  let error;

  try {
    response = await AxiosInstance()({
      url: `/survey/question/${payload.questionId}/selection/${payload.id}`,
      method: 'put',
      data: {
        select: payload.select,
        is_accepted: !payload.isAccepted,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: UPDATE_SELECTION,
    response,
    error,
  };
}

export async function destroySelection(payload) {
  let response;
  let error;

  try {
    response = await AxiosInstance()({
      url: `/survey/question/${payload.questionId}/selection/${payload.id}`,
      method: 'delete',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DESTROY_SELECTION,
    response,
    error,
  };
}

// Initial State
export const initialState = {
  length: 0,
  items: [],
  item: {},
  error: '',
};

// Reducer Functions
function reducerListSelection(state, action) {
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
}

function reducerCRUDSelection(state, action) {
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
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_SELECTION:
      return reducerListSelection(state, action);
    case CREATE_SELECTION:
      return reducerCRUDSelection(state, action);
    case UPDATE_SELECTION:
      return reducerCRUDSelection(state, action);
    case DESTROY_SELECTION:
      return reducerCRUDSelection(state, action);
    default:
      return state;
  }
}
