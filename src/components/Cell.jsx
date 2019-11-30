import React from 'react';
import Mark from "./Mark";
import SingleValue from "./SingleValue";
import "./Cell.css";


const Cell = ({ row, col, item, updateCell, toggleMark }) => (
    <td className="sudoku-cell">
        <div className="sudoku-cell-container" tabIndex="0" onKeyUp={(event) => updateCell({row, col, value: event.key, keyCode: event.keyCode})}>
            {(item.type === "mark" || item.value === "") ? (
                <Mark row={row} col={col} marks={item.value} removed={item.removed} toggleMark={toggleMark}/>
            ) : (
                <SingleValue value={item.value} />
            )}
        </div>
    </td>
)

export default Cell;
