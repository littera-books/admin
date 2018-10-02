// Actions
const INITIALIZE = 'INITIALIZE';
const CALL_POPUP_FILTER = 'CALL_POPUP_FILTER';

const PopupFilters = {
  SHOW_POPUP: 'visible',
  HIDE_POPUP: 'hidden',
};

const SET_HEADER_PROPERTY = 'SET_HEADER_PROPERTY';
const SET_MESSAGE_PROPERTY = 'SET_MESSAGE_PROPERTY';

// Action Creators
export function initializePopup() {
  return {
    type: INITIALIZE,
  };
}

export function callPopupFilter(filter) {
  return {
    type: CALL_POPUP_FILTER,
    filter,
  };
}

export function setHeaderProperty(header) {
  return {
    type: SET_HEADER_PROPERTY,
    header,
  };
}

export function setMessageProperty(message) {
  return {
    type: SET_MESSAGE_PROPERTY,
    message,
  };
}

// Initial State
const initialState = {
  filter: PopupFilters.HIDE_POPUP,
  header: '',
  message: '',
};

// Reducer Functions;
function reducerInitialize(state) {
  return {
    ...state,
    filter: PopupFilters.HIDE_POPUP,
    header: '',
    message: '',
  };
}

function reducerCallPopup(state) {
  return {
    ...state,
    filter: PopupFilters.SHOW_POPUP,
  };
}

function reducerSetHeaderProperty(state, action) {
  return {
    ...state,
    header: action.header,
  };
}

function reducerSetMessageProperty(state, action) {
  return {
    ...state,
    message: action.message,
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return reducerInitialize(state);
    case CALL_POPUP_FILTER:
      return reducerCallPopup(state, action);
    case SET_HEADER_PROPERTY:
      return reducerSetHeaderProperty(state, action);
    case SET_MESSAGE_PROPERTY:
      return reducerSetMessageProperty(state, action);
    default:
      return state;
  }
}
