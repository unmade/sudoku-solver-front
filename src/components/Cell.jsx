import React from "react";
import "./Cell.css";
import {TextInput} from "grommet";


const Cell = ({ value }) => (
    <td className="sudoku-cell">
        {/* <TextInput value={value}/> */}
        {value || <span>&nbsp;</span>}
    </td>
);


export default Cell;
