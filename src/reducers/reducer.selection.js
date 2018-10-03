import AxiosInstance from './axios.instance';

// Actions
const LIST_SELECTION = 'LIST_SELECTION';
const UPDATE_SELECTION = 'UPDATE_SELECTION';

// Action Creators
export async function listSelection(subject) {
  let response;
  let error;

  try {
    response = await AxiosInstance({
      url: `/survey/question/${subject}/selection`,
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

export async function updateSelection(payload) {
  let response;
  let error;

  try {
    response = await AxiosInstance({
      url: `/survey/question/${payload.subject}/selection/${payload.id}`,
      method: 'put',
      data: {
        select: payload.select,
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
    return {
      ...state,
      error: action.error,
    };
  }

  return {
    ...state,
    length: action.response.data.length,
    items: action.response.data.items,
    error: '',
  };
}

function reducerUpdateSelection(state, action) {
  if (action.error) {
    return {
      ...state,
      error: action.error,
    };
  }

  return {
    ...state,
    error: '',
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_SELECTION:
      return reducerListSelection(state, action);
    case UPDATE_SELECTION:
      return reducerUpdateSelection(state, action);
    default:
      return state;
  }
}
