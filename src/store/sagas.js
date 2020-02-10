import { all } from 'redux-saga/effects';
import { authSagas } from './auth/actions';
import { sudokuSagas } from './sudoku/actions';
import { profileSagas } from './profiles/actions';


function* rootSaga() {
  yield all([
    ...authSagas,
    ...profileSagas,
    ...sudokuSagas,
  ]);
}


export default rootSaga;
