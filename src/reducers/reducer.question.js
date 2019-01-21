import axiosInstance from './axios.instance';

// Actions
const LIST_QUESTION = 'LIST_QUESTION';
const DETAIL_QUESTION = 'DETAIL_QUESTION';
const CREATE_QUESTION = 'CREATE_QUESTION';
const UPDATE_QUESTION = 'UPDATE_QUESTION';
const DESTROY_QUESTION = 'DESTROY_QUESTION';

// Action Creators
export async function listQuestion() {
  let response;
  let error;

  try {
    response = await axiosInstance()({
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

export async function detailQuestion(questionId) {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/survey/question/${questionId}`,
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

export async function createQuestion(payload) {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: '/survey/question',
      method: 'post',
      data: {
        subject: payload.subject,
        title: payload.title,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: CREATE_QUESTION,
    response,
    error,
  };
}

export async function updateQuestion(payload) {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/survey/question/${payload.questionId}`,
      method: 'put',
      data: {
        subject: payload.subject,
        title: payload.title,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: UPDATE_QUESTION,
    response,
    error,
  };
}

export async function destroyQuestion(questionId) {
  let response;
  let error;

  try {
    response = await axiosInstance()({
      url: `/survey/question/${questionId}`,
      method: 'delete',
    });
  } catch (e) {
    error = e;
  }

  return {
    type: DESTROY_QUESTION,
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

function reducerCreateQuestion(state, action) {
  if (action.error) {
    return {
      ...state,
      error: action.error.response.data.message,
    };
  }

  return {
    ...state,
    error: '',
  };
}

function reducerUpdateQuestion(state, action) {
  if (action.error) {
    return {
      ...state,
      error: action.error.response.data.message,
    };
  }

  return {
    ...state,
    error: '',
  };
}

function reducerDestroyQuestion(state, action) {
  if (action.error) {
    return {
      ...state,
      error: action.error.response.data.message,
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
    case LIST_QUESTION:
      return reducerListQuestion(state, action);
    case DETAIL_QUESTION:
      return reducerDetailQuestion(state, action);
    case CREATE_QUESTION:
      return reducerCreateQuestion(state, action);
    case UPDATE_QUESTION:
      return reducerUpdateQuestion(state, action);
    case DESTROY_QUESTION:
      return reducerDestroyQuestion(state, action);
    default:
      return state;
  }
}
