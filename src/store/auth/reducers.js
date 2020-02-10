import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
} from './actions';


export const INITIAL_STATE = {
  tokens: null,
  loading: false,
  error: null,
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        tokens: action.payload,
        loading: false,
      };
    }
    case SIGN_IN_FAILURE: {
      return {
        tokens: null,
        loading: false,
        error: action.payload,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      const { token } = action.payload;
      return {
        ...state,
        loading: false,
        tokens: {
          ...state.tokens,
          token,
        },
      };
    }
    case REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        tokens: null,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};


export default AuthReducer;
