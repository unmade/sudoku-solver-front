import { put, takeEvery } from 'redux-saga/effects';
import API_BASE_URL from '../api-config';
import { retrieveProfile } from '../profiles/actions';

const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';


function signInUserRequest() {
  return {
    type: SIGNIN_USER_REQUEST,
    payload: null,
  };
}


function signInUserSuccess({ token, refresh }) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: {
      token,
      refresh,
    },
  };
}


function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error,
  };
}


export function signInUser({ code }) {
  return {
    type: SIGNIN_USER,
    payload: {
      code,
    },
  };
}


function* signInUserSaga({ payload }) {
  const { code } = payload;
  const url = `${API_BASE_URL}/auth/google-oauth2/tokens`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirect_uri: 'http://localhost:3000',
    }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(signInUserRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    const { token } = data;
    if (response.ok) {
      yield put(signInUserSuccess(data));
      yield put(retrieveProfile({ token }));
    } else {
      yield put(signInUserFailure(data));
    }
  } catch (e) {
    yield put(signInUserFailure(e));
  }
}


export const authSagas = [
  takeEvery(SIGNIN_USER, signInUserSaga),
];
