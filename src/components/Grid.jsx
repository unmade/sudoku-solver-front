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
      position: null,
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
      position: null,
    });
  }

  onFocus(row, col) {
    const { sudoku } = this.state;
    this.setState({
      sudoku: selectIntersection(selectCells(clearSelection(sudoku), [[row, col]]), [[row, col]]),
      position: [row, col],
    });
  }

  onKeyUp(event, row, col) {
    const { sudoku, onCellChange } = this.state;
    const code = event.keyCode;
    if (code === 8) { // backspace
      const newSudoku = clearCell(sudoku, row, col);
      this.setState({
        sudoku: newSudoku,
      });
      onCellChange(newSudoku);
    }
    if (code === 37) {
      this.moveLeft();
    }
    if (code === 38) {
      this.moveUp();
    }
    if (code === 39) {
      this.moveRight();
    }
    if (code === 40) {
      this.moveDown();
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

  moveLeft() {
    // 0 0 -> 8 8
    // 0 1 -> 0 0
    // 1 0 -> 0 8
    // 4 4 -> 4 3

    const { position, sudoku } = this.state;
    if (position) {
      const col = position[1] - 1;
      const newPos = [];
      if (col < 0) {
        if (position[0] - 1 < 0) {
          newPos.push(8, 8);
        } else {
          newPos.push(position[0] - 1, 8);
        }
      } else {
        newPos.push(position[0], col);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        position: newPos,
      });
    }
  }

  moveRight() {
    // 8 8 -> 0 0
    // 0 1 -> 0 2
    // 0 8 -> 1 0
    // 4 4 -> 4 5

    const { position, sudoku } = this.state;
    if (position) {
      const col = position[1] + 1;
      const newPos = [];
      if (col > 8) {
        if (position[0] + 1 > 8) {
          newPos.push(0, 0);
        } else {
          newPos.push(position[0] + 1, 0);
        }
      } else {
        newPos.push(position[0], col);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        position: newPos,
      });
    }
  }

  moveUp() {
    // 0 0 -> 8 0
    // 0 1 -> 1 1
    // 8 0 -> 7 0
    // 4 4 -> 3 4

    const { position, sudoku } = this.state;
    if (position) {
      const row = position[0] - 1;
      const newPos = [];
      if (row < 0) {
        newPos.push(8, position[1]);
      } else {
        newPos.push(row, position[1]);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        position: newPos,
      });
    }
  }

  moveDown() {
    // 8 0 -> 0 0
    // 1 1 -> 2 1
    // 7 0 -> 8 0
    // 4 4 -> 3 4

    const { position, sudoku } = this.state;
    if (position) {
      const row = position[0] + 1;
      const newPos = [];
      if (row > 8) {
        newPos.push(0, position[1]);
      } else {
        newPos.push(row, position[1]);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        position: newPos,
      });
    }
  }

  updateSudokuIfNeeded(prevSudoku) {
    const { sudoku } = this.props;
    if (sudoku !== prevSudoku) {
      this.setState({ sudoku });
    }
  }

  render() {
    const { sudoku, position, sizeN, sizeM } = this.state;
    return (
      <table className="sudoku">
        <tbody>
          {[...Array(sizeN).keys()].map((i) => (
            <tr key={i}>
              {[...Array(sizeM).keys()].map((j) => (
                <Cell
                  key={j}
                  item={sudoku[[i, j]]}
                  hasFocus={position && i === position[0] && j === position[1]}
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
