import {
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
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
    case SIGNIN_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        tokens: action.payload,
        loading: false,
      };
    }
    case SIGNIN_USER_FAILURE: {
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
