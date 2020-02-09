import {
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
} from './actions';


const INITIAL_STATE = {
  token: null,
  loading: false,
  error: null,
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      const { token } = action.payload;
      return {
        ...state,
        token,
        loading: false,
      };
    }
    case SIGNIN_USER_FAILURE: {
      return {
        token: null,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};


export default AuthReducer;
