import React from 'react';
import './Grid.css';
import Cell from './Cell';
import {
  clearCell,
  clearSelection,
  selectCells,
  selectIntersection,
  setCellSingleValue,
  toggleMarkValue,
} from '../sudoku';


class Grid extends React.Component {
  constructor(props) {
    super(props);
    const { sudoku, onCellChange } = props;
    this.state = {
      sizeN: 9,
      sizeM: 9,
      sudoku,
      onCellChange,
    };
  }

  componentDidUpdate(prevProps) {
    this.updateSudokuIfNeeded(prevProps.sudoku);
  }

  onBlur() {
    const { sudoku } = this.state;
    this.setState({
      sudoku: clearSelection(sudoku),
    });
  }

  onFocus(row, col) {
    const { sudoku } = this.state;
    this.setState({
      sudoku: selectIntersection(selectCells(clearSelection(sudoku), [[row, col]]), [[row, col]]),
    });
  }

  onKeyUp(event, row, col) {
    const { sudoku, onCellChange } = this.state;
    if (event.keyCode === 8) { // backspace
      const newSudoku = clearCell(sudoku, row, col);
      this.setState({
        sudoku: newSudoku,
      });
      onCellChange(newSudoku);
    }
    if (event.key >= 1 && event.key <= 9) {
      const newSudoku = setCellSingleValue(sudoku, row, col, parseInt(event.key, 10));
      this.setState({
        sudoku: newSudoku,
      });
      onCellChange(newSudoku);
    }
  }

  onMarkClick(row, col, value) {
    const { sudoku, onCellChange } = this.state;
    const newSudoku = toggleMarkValue(sudoku, row, col, parseInt(value, 10));
    this.setState({
      sudoku: newSudoku,
    });
    onCellChange(newSudoku);
  }

  updateSudokuIfNeeded(prevSudoku) {
    const { sudoku } = this.props;
    if (sudoku !== prevSudoku) {
      this.setState({ sudoku });
    }
  }

  render() {
    const { sudoku, sizeN, sizeM } = this.state;
    return (
      <table className="sudoku">
        <tbody>
          {[...Array(sizeN).keys()].map((i) => (
            <tr key={i}>
              {[...Array(sizeM).keys()].map((j) => (
                <Cell
                  key={j}
                  item={sudoku[[i, j]]}
                  onBlur={() => this.onBlur()}
                  onFocus={() => this.onFocus(i, j)}
                  onKeyUp={(event) => this.onKeyUp(event, i, j)}
                  onMarkClick={(value) => this.onMarkClick(i, j, value)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}


export default Grid;
