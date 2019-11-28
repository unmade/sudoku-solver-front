import React from 'react';
import Mark from "./Mark";
import SingleValue from "./SingleValue";
import "./Cell.css";


const Cell = ({ row, col, item, updateCell, toggleMark }) => (
    <td className="sudoku-cell">
        {(item.type === "mark" || item.value === "") ? (
            <Mark row={row} col={col} marks={item.value} toggleMark={toggleMark}/>
        ) : (
            <SingleValue row={row} col={col} value={item.value} updateCell={updateCell} />
        )}
    </td>
)

export default Cell;
