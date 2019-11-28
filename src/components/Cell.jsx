import React from "react";
import "./Cell.css";
import {TextInput} from "grommet";


const Cell = ({ row, col, value, updateCell }) => (
    <td className="sudoku-cell">
        <TextInput type="text" maxLength={1} value={value} onChange={updateCell({ row, col })}/>
    </td>
);


export default Cell;
