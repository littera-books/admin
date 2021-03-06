import { axiosNoAuth } from './axios.instance';

// Actions
const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

// Action Creators
export function initialize() {
  return {
    type: INITIALIZE,
  };
}

export async function signIn(payload) {
  let response;
  let error;

  try {
    response = await axiosNoAuth({
      url: '/auth/admin',
      method: 'post',
      data: {
        username: payload.username,
        password: payload.password,
      },
    });
  } catch (e) {
    error = e;
  }

  return {
    type: SIGN_IN,
    response,
    error,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

// Initial State
export const initialState = {
  error: '',
};

// Reducer Functions
function reducerInitialize(state) {
  return {
    ...state,
    error: '',
  };
}

function reducerSignIn(state, action) {
  if (action.error) {
    return {
      ...state,
      error: action.error.response.data.reasons[0],
    };
  }

  sessionStorage.setItem('adminToken', action.response.data.admin_token);
  return {
    ...state,
    error: '',
  };
}

function reducerSignOut(state) {
  sessionStorage.removeItem('adminToken');
  return {
    ...state,
    error: '',
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return reducerInitialize(state);
    case SIGN_IN:
      return reducerSignIn(state, action);
    case SIGN_OUT:
      return reducerSignOut(state);
    default:
      return state;
  }
}
