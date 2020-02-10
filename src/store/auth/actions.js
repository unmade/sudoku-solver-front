import jwtDecode from 'jwt-decode';
import {
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import API_BASE_URL from '../api-config';
import { retrieveProfile } from '../profiles/actions';
import { getTokens } from './selectors';

const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';


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


function refreshTokenRequest() {
  return {
    type: REFRESH_TOKEN_REQUEST,
    payload: null,
  };
}


function refreshTokenSuccess({ access: token }) {
  return {
    type: REFRESH_TOKEN_SUCCESS,
    payload: {
      token,
    },
  };
}


function refreshTokenFailure(error) {
  return {
    type: REFRESH_TOKEN_FAILURE,
    payload: error,
  };
}


export function refreshToken({ refresh }) {
  return {
    type: REFRESH_TOKEN,
    payload: {
      refresh,
    },
  };
}


function* refreshTokenSaga({ payload }) {
  const { refresh } = payload;
  const url = `${API_BASE_URL}/auth/tokens/refresh`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh,
    }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(refreshTokenRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(refreshTokenSuccess(data));
    } else {
      yield put(refreshTokenFailure(data));
    }
  } catch (e) {
    yield put(refreshTokenFailure(e));
  }
}


function* refreshTokenWatcher() {
  let tokens = yield select(getTokens);

  while (true) {
    if (!tokens) {
      const { payload } = yield take(SIGNIN_USER_SUCCESS);
      if (payload) {
        tokens = payload;
      }
    }

    const { exp } = jwtDecode(tokens.token);
    const now = new Date();
    const expiresIn = (exp * 1000 - now) - 30 * 1000;
    const { expired } = yield race({
      expired: delay(expiresIn),
      // signOut should also be handled here;
    });
    if (expired) {
      yield put(refreshToken(tokens));
      const { success } = yield race({
        success: take(REFRESH_TOKEN_SUCCESS),
        failure: take(REFRESH_TOKEN_FAILURE),
      });
      if (success) {
        tokens = yield select(getTokens);
        if (exp * 1000 < now) {
          // if token was already expired
          // we couldn't retrieve profile, so do it again
          yield put(retrieveProfile(tokens));
        }
      }
    }
    // just a safe measure in case something wrong with expiresIn
    yield delay(30 * 1000);
  }
}


export const authSagas = [
  refreshTokenWatcher(),
  takeEvery(REFRESH_TOKEN, refreshTokenSaga),
  takeEvery(SIGNIN_USER, signInUserSaga),
];
