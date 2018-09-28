import axiosInstance from './axios.instance';

// Actions
const LIST_QUESTION = 'LIST_QUESTION';
const DETAIL_QUESTION = 'DETAIL_QUESTION';

// Action Creators
export async function listQuestion() {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: '/survey/question',
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: LIST_QUESTION,
    response,
    error,
  };
}

export async function detailQuestion(subject) {
  let response;
  let error;

  try {
    response = await axiosInstance({
      url: `/survey/question/${subject}`,
      method: 'get',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DETAIL_QUESTION,
    response,
    error,
  };
}

// Initial State
export const initialState = {
  length: 0,
  items: [],
  item: {
    subject: '',
    title: '',
  },
  error: '',
};

// Reducer Functions
function reducerListQuestion(state, action) {
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

function reducerDetailQuestion(state, action) {
  if (action.error) {
    return {
      ...state,
      error: action.error,
    };
  }

  return {
    ...state,
    item: action.response.data,
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_QUESTION:
      return reducerListQuestion(state, action);
    case DETAIL_QUESTION:
      return reducerDetailQuestion(state, action);
    default:
      return state;
  }
}
