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

const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

const SIGN_OUT = 'SIGN_OUT';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_IN_FAILURE';


const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';


function signInRequest() {
  return {
    type: SIGN_IN_REQUEST,
    payload: null,
  };
}


function signInSuccess({ token, refresh }) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token,
      refresh,
    },
  };
}


function signInFailure(error) {
  return {
    type: SIGN_IN_FAILURE,
    payload: error,
  };
}


export function signIn({ code }) {
  return {
    type: SIGN_IN,
    payload: {
      code,
    },
  };
}


function* signInSaga({ payload }) {
  const { code } = payload;
  const url = `${API_BASE_URL}/auth/google-oauth2/tokens`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirect_uri: window.location.origin,
    }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(signInRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    const { token } = data;
    if (response.ok) {
      yield put(signInSuccess(data));
      yield put(retrieveProfile({ token }));
    } else {
      yield put(signInFailure(data));
    }
  } catch (e) {
    yield put(signInFailure(e));
  }
}


function signOutRequest() {
  return {
    type: SIGN_OUT_REQUEST,
    payload: null,
  };
}


function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
    payload: null,
  };
}


function signOutFailure(error) {
  return {
    type: SIGN_OUT_FAILURE,
    payload: error,
  };
}


export function signOut() {
  return {
    type: SIGN_OUT,
    payload: null,
  };
}


function* signOutSaga() {
  yield put(signOutRequest());
  try {
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e));
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
      const { payload } = yield take(SIGN_IN_SUCCESS);
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
  takeEvery(SIGN_IN, signInSaga),
  takeEvery(SIGN_OUT, signOutSaga),
];
