import React from "react";
import "./Cell.css";


const Cell = ({ value }) => (
    <td className="sudoku-cell">
        {value || <span>&nbsp;</span>}
    </td>
);


export default Cell;
