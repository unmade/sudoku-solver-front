import {
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
} from './actions';


const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action) {
    case SIGNIN_USER_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        loading: false,
        ...state,
      };
    }
    case SIGNIN_USER_FAILURE: {
      return {
        user: null,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};


export default AuthReducer;
