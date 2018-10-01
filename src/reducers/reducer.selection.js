import AxiosInstance from './axios.instance';

// Actions
const LIST_SELECTION = 'LIST_SELECTION';

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

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_SELECTION:
      return reducerListSelection(state, action);
    default:
      return state;
  }
}
