import React from 'react';
import './SingleValue.css';


const SingleValue = ({ value }) => (
  <div className="sudoku-single-value">
    <div>{value}</div>
  </div>
);


export default SingleValue;
