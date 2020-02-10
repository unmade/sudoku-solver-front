import { INITIAL_STATE } from './reducers';

const KEY = 'state.auth.tokens';


export function saveAuthState(state) {
  if (state.auth.tokens !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify((state.auth || {}).tokens));
  }
}


export function loadAuthState() {
  const tokens = JSON.parse(localStorage.getItem(KEY)) || null;
  return {
    auth: {
      ...INITIAL_STATE,
      tokens,
    },
  };
}
