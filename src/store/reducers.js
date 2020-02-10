import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers';
import ProfileReducer from './profiles/reducers';
import SudokuReducer from './sudoku/reducers';


const reducers = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  sudoku: SudokuReducer,
});


export default reducers;
