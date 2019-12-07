/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Mark from './Mark';
import SingleValue from './SingleValue';
import './Cell.css';


const Cell = ({
  row, col, item, toggleMark, onKeyUp, onFocus, onBlur,
}) => {
  const className = (
    (item.isSelected ? ' sudoku-cell-selected' : '')
    + (item.isIntersected && !item.isSelected ? ' sudoku-cell-intersected' : '')
    + (item.incorrect ? ' sudoku-cell-incorrect' : '')
  );

  return (
    <td className={`sudoku-cell ${className}`}>
      <div
        tabIndex="0"
        className="sudoku-cell-container"
        onFocus={onFocus({ row, col })}
        onBlur={onBlur}
        onKeyUp={onKeyUp({ row, col })}
      >
        {(item.type === 'mark') ? (
          <Mark
            row={row}
            col={col}
            marks={item.value}
            removed={item.removed}
            toggleMark={toggleMark}
          />
        ) : (
          <SingleValue value={item.value} />
        )}
      </div>
    </td>
  );
};

export default Cell;
