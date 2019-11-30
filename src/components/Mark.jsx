/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Mark.css';


const Mark = ({
  row, col, marks, removed, toggleMark,
}) => (
  <div className="sudoku-marks-container">
    {[...Array(3).keys()].map((i) => (
      <div key={i}>
        {[...Array(3).keys()].map((j) => {
          const value = Math.floor(i % 3) * 3 + Math.floor(j % 3) + 1;
          if (removed && removed.indexOf(value) > -1) {
            return <span className="sudoku-mark-removed" key={j}>{value}</span>;
          }
          const className = marks.indexOf(value) > -1 ? 'sudoku-mark-selected' : 'sudoku-mark-deselected';
          return (
            <span
              onClick={() => toggleMark({ row, col, value })}
              className={className}
              key={j}
            >
              {value}
            </span>
          );
        })}
      </div>
    ))}
  </div>
);


export default Mark;
