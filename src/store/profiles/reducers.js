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
  switch (action) {
    case RETRIEVE_PROFILE_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case RETRIEVE_PROFILE_SUCCESS: {
      return {
        item: action.payload,
        loading: false,
        ...state,
      };
    }
    case RETRIEVE_PROFILE_FAILURE: {
      return {
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
