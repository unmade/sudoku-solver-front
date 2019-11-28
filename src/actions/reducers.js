import { combineReducers } from 'redux';
import { SudokuReducer } from './sudoku/reducers';


const reducers = combineReducers({
    sudoku: SudokuReducer,
});


export default reducers;
