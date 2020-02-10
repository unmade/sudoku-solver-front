import { put, takeEvery } from 'redux-saga/effects';
import API_BASE_URL from '../api-config';

const RETRIEVE_PROFILE = 'RETRIEVE_PROFILE';
export const RETRIEVE_PROFILE_REQUEST = 'RETRIEVE_PROFILE_REQUEST';
export const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
export const RETRIEVE_PROFILE_FAILURE = 'RETRIEVE_PROFILE_FAILURE';


function retrieveProfileRequest() {
  return {
    type: RETRIEVE_PROFILE_REQUEST,
    payload: null,
  };
}


function retrieveProfileSuccess({ name, picture_url: pictureUrl }) {
  return {
    type: RETRIEVE_PROFILE_SUCCESS,
    payload: {
      name,
      pictureUrl,
    },
  };
}


function retrieveProfileFailure(error) {
  return {
    type: RETRIEVE_PROFILE_FAILURE,
    payload: error,
  };
}


export function retrieveProfile({ token }) {
  return {
    type: RETRIEVE_PROFILE,
    payload: {
      token,
    },
  };
}


function* retrieveProfileSaga({ payload }) {
  const { token } = payload;
  const url = `${API_BASE_URL}/profiles/me`;
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
    mode: 'cors',
    cache: 'default',
  };

  yield put(retrieveProfileRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(retrieveProfileSuccess(data));
    } else {
      yield put(retrieveProfileFailure(data));
    }
  } catch (e) {
    yield put(retrieveProfileFailure(e));
  }
}


export const profileSagas = [
  takeEvery(RETRIEVE_PROFILE, retrieveProfileSaga),
];
