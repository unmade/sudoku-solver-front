import {
  RETRIEVE_PROFILE_REQUEST,
  RETRIEVE_PROFILE_SUCCESS,
  RETRIEVE_PROFILE_FAILURE,
} from './actions';


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
        item: null,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};


export default ProfileReducer;
