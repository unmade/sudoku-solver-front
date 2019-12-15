import React from 'react';
import Cell from './Cell';
import './Grid.css';


const Grid = ({
  boxSize, focusPosition, size, sudoku, onBlur, onFocus, onKeyUp, onCandidateClick,
}) => (
  <table className="sudoku">
    <tbody>
      {[...Array(size).keys()].map((i) => (
        <tr key={i}>
          {[...Array(size).keys()].map((j) => (
            <Cell
              key={j}
              item={sudoku[[i, j]]}
              boxSize={boxSize}
              hasFocus={focusPosition && i === focusPosition[0] && j === focusPosition[1]}
              onBlur={onBlur()}
              onFocus={onFocus(i, j)}
              onKeyUp={onKeyUp(i, j)}
              onCandidateClick={onCandidateClick(i, j)}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);


export default Grid;
