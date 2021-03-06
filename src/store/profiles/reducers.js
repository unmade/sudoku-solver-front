import {
  RETRIEVE_PROFILE_REQUEST,
  RETRIEVE_PROFILE_SUCCESS,
  RETRIEVE_PROFILE_FAILURE,
} from './actions';
import {
  SIGN_OUT_SUCCESS,
} from '../auth/actions';


const INITIAL_STATE = {
  item: null,
  loading: false,
  error: null,
};


const ProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case RETRIEVE_PROFILE_SUCCESS: {
      return {
        ...state,
        item: action.payload,
        loading: false,
      };
    }
    case RETRIEVE_PROFILE_FAILURE: {
      return {
        ...state,
        item: null,
        loading: false,
        error: action.payload,
      };
    }
    case SIGN_OUT_SUCCESS: {
      return {
        ...state,
        item: null,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};


export default ProfileReducer;
