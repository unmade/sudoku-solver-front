import { all } from 'redux-saga/effects';
import { sudokuSagas } from './sudoku/actions';


function* rootSaga() {
  yield all([
    ...sudokuSagas,
  ]);
}


export default rootSaga;
