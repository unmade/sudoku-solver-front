import React from "react";
import {TextInput} from "grommet";
import "./SingleValue.css";


const SingleValue = ({ row, col, value, updateCell }) => (
    <div className="sudoku-single-value">
        <TextInput type="text" maxLength={1} value={value} onChange={updateCell({ row, col })}/>
    </div>
);


export default SingleValue;
