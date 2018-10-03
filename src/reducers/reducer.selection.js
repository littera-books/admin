import AxiosInstance from './axios.instance';

// Actions
const LIST_SELECTION = 'LIST_SELECTION';
const CREATE_SELECTION = 'CREATE_SELECTION';
const UPDATE_SELECTION = 'UPDATE_SELECTION';
const DESTROY_SELECTION = 'DESTROY_SELECTION';

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

export async function createSelection(payload) {
  let response;
  let error;

  try {
    response = await AxiosInstance({
      url: `/survey/question/${payload.subject}/selection`,
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

export async function destroySelecton(payload) {
  let response;
  let error;

  try {
    response = await AxiosInstance({
      url: `/survey/question/${payload.subject}/selection/${payload.id}`,
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

function reducerCreateSelection(state, action) {
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

function reducerDestroySelection(action, state) {
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
    case CREATE_SELECTION:
      return reducerCreateSelection(state, action);
    case UPDATE_SELECTION:
      return reducerUpdateSelection(state, action);
    case DESTROY_SELECTION:
      return reducerDestroySelection(state, action);
    default:
      return state;
  }
}
