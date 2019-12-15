/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Candidates.css';


const Candidates = ({ candidates, removed, boxSize, onCandidateClick }) => {
  const [width, length] = boxSize;
  return (
    <div className="sudoku-candidates-container">
      {[...Array(length).keys()].map((i) => (
        <div key={i}>
          {[...Array(width).keys()].map((j) => {
            const value = Math.floor(i % width) * width + Math.floor(j % length) + 1;
            if (removed.length > 0 && removed.indexOf(value) > -1) {
              return <span className="sudoku-candidate removed" key={j}>{value}</span>;
            }
            const className = candidates.indexOf(value) > -1 ? 'selected' : 'deselected';
            return (
              <span
                onClick={() => onCandidateClick(value)}
                className={`sudoku-candidate ${className}`}
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
};


export default Candidates;
