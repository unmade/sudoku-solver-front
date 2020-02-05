import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers';
import SudokuReducer from './sudoku/reducers';


const reducers = combineReducers({
  auth: AuthReducer,
  sudoku: SudokuReducer,
});


export default reducers;
