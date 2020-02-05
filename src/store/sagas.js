import { all } from 'redux-saga/effects';
import { authSagas } from './auth/actions';
import { sudokuSagas } from './sudoku/actions';


function* rootSaga() {
  yield all([
    ...authSagas,
    ...sudokuSagas,
  ]);
}


export default rootSaga;
