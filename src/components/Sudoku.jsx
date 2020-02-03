import React from 'react';
import { Box } from 'grommet';
import Grid from './Grid';
import Keypad from './Keypad';
import {
  clearCell,
  clearSelection,
  selectCells,
  selectIntersection,
  setCellSingleValue,
  toggleCandidate,
} from '../sudoku';


const keypadPad = {
  top: 'medium',
};


class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    const { boxSize, sudoku, onCellChange } = props;
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.gridNode = null;
    this.keypadNode = null;
    this.state = {
      focusPosition: null,
      size: boxSize[0] * boxSize[1],
      sudoku,
      onCellChange,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentDidUpdate(prevProps) {
    this.updateSudokuIfNeeded(prevProps.sudoku);
    this.updateBoxSizeIfNeeded(prevProps.boxSize);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  onBlur() {
    const { sudoku } = this.state;
    this.setState({
      sudoku: clearSelection(sudoku),
      focusPosition: null,
    });
  }

  onFocus(row, col) {
    const { sudoku } = this.state;
    this.setState({
      sudoku: selectIntersection(selectCells(clearSelection(sudoku), [[row, col]]), [[row, col]]),
      focusPosition: [row, col],
    });
  }

  onKeyUp(event, row, col) {
    const { sudoku, size, onCellChange } = this.state;
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
    if (event.key >= 1 && event.key <= size) {
      const newSudoku = setCellSingleValue(sudoku, row, col, parseInt(event.key, 10));
      this.setState({
        sudoku: newSudoku,
      });
      onCellChange(newSudoku);
    }
  }

  onCandidateClick(row, col, value) {
    const { sudoku, onCellChange } = this.state;
    const newSudoku = toggleCandidate(sudoku, row, col, parseInt(value, 10));
    this.setState({
      sudoku: newSudoku,
    });
    onCellChange(newSudoku);
  }

  onNumberClick(value) {
    const { focusPosition, sudoku } = this.state;
    if (focusPosition) {
      const { onCellChange } = this.props;
      const [row, col] = focusPosition;
      const newSudoku = setCellSingleValue(sudoku, row, col, parseInt(value, 10));
      this.setState({
        sudoku: newSudoku,
      });
      onCellChange(newSudoku);
    }
  }

  onErase() {
    const { focusPosition, sudoku } = this.state;
    if (focusPosition) {
      const { onCellChange } = this.props;
      const [row, col] = focusPosition;
      const newSudoku = clearCell(sudoku, row, col);
      this.setState({
        sudoku: newSudoku,
      });
      onCellChange(newSudoku);
    }
  }

  handleClickOutside(e) {
    if (!this.gridNode.contains(e.target) && !this.keypadNode.contains(e.target)) {
      this.onBlur();
    }
  }

  moveLeft() {
    // 0 0 -> 8 8
    // 0 1 -> 0 0
    // 1 0 -> 0 8
    // 4 4 -> 4 3

    const { focusPosition, size, sudoku } = this.state;
    if (focusPosition) {
      const col = focusPosition[1] - 1;
      const newPos = [];
      if (col < 0) {
        if (focusPosition[0] - 1 < 0) {
          newPos.push(size - 1, size - 1);
        } else {
          newPos.push(focusPosition[0] - 1, size - 1);
        }
      } else {
        newPos.push(focusPosition[0], col);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        focusPosition: newPos,
      });
    }
  }

  moveRight() {
    // 8 8 -> 0 0
    // 0 1 -> 0 2
    // 0 8 -> 1 0
    // 4 4 -> 4 5

    const { focusPosition, size, sudoku } = this.state;
    if (focusPosition) {
      const col = focusPosition[1] + 1;
      const newPos = [];
      if (col > size - 1) {
        if (focusPosition[0] + 1 > size - 1) {
          newPos.push(0, 0);
        } else {
          newPos.push(focusPosition[0] + 1, 0);
        }
      } else {
        newPos.push(focusPosition[0], col);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        focusPosition: newPos,
      });
    }
  }

  moveUp() {
    // 0 0 -> 8 0
    // 0 1 -> 1 1
    // 8 0 -> 7 0
    // 4 4 -> 3 4

    const { focusPosition, size, sudoku } = this.state;
    if (focusPosition) {
      const row = focusPosition[0] - 1;
      const newPos = [];
      if (row < 0) {
        newPos.push(size - 1, focusPosition[1]);
      } else {
        newPos.push(row, focusPosition[1]);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        focusPosition: newPos,
      });
    }
  }

  moveDown() {
    // 8 0 -> 0 0
    // 1 1 -> 2 1
    // 7 0 -> 8 0
    // 4 4 -> 3 4

    const { focusPosition, size, sudoku } = this.state;
    if (focusPosition) {
      const row = focusPosition[0] + 1;
      const newPos = [];
      if (row > size - 1) {
        newPos.push(0, focusPosition[1]);
      } else {
        newPos.push(row, focusPosition[1]);
      }
      this.setState({
        sudoku: selectIntersection(selectCells(clearSelection(sudoku), [newPos]), [newPos]),
        focusPosition: newPos,
      });
    }
  }

  updateSudokuIfNeeded(prevSudoku) {
    const { sudoku } = this.props;
    if (sudoku !== prevSudoku) {
      this.setState({ sudoku });
    }
  }

  updateBoxSizeIfNeeded(prevBoxSize) {
    const { boxSize } = this.props;
    if (boxSize[0] !== prevBoxSize[0] || boxSize[1] !== prevBoxSize[1]) {
      this.setState({ size: (boxSize[0] * boxSize[1]) });
    }
  }

  render() {
    const { boxSize } = this.props;
    const { focusPosition, size, sudoku } = this.state;
    return (
      <Box fill>
        <Box ref={(node) => { this.gridNode = node; }}>
          <Grid
            boxSize={boxSize}
            focusPosition={focusPosition}
            size={size}
            sudoku={sudoku}
            onBlur={() => () => this.onBlur()}
            onFocus={(i, j) => () => this.onFocus(i, j)}
            onKeyUp={(i, j) => (event) => this.onKeyUp(event, i, j)}
            onCandidateClick={(i, j) => (value) => this.onCandidateClick(i, j, value)}
          />
        </Box>
        <Box
          pad={keypadPad}
          responsive={false}
          ref={(node) => { this.keypadNode = node; }}
        >
          <Keypad
            size={size}
            onErase={() => this.onErase()}
            onNumberClick={(value) => this.onNumberClick(value)}
          />
        </Box>
      </Box>
    );
  }
}


export default Sudoku;
