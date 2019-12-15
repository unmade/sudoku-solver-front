import React from 'react';
import './SingleValue.css';


const SingleValue = ({ value }) => (
  <div className="sudoku-single-value">
    <span>{value}</span>
  </div>
);


export default SingleValue;
