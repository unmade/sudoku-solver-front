import React from 'react';
import Mark from "./Mark";
import SingleValue from "./SingleValue";
import "./Cell.css";


const Cell = ({ row, col, item, selectCell, updateCell, toggleMark }) => (
    <td className={
        "sudoku-cell " + (item.isSelected ? "sudoku-cell-selected" : "") + (item.isIntersected ? "sudoku-cell-intersected" : "")
    }>
        <div 
          className="sudoku-cell-container" 
          tabIndex="0"
          onFocus={() => selectCell({row, col})}
          onKeyUp={(event) => updateCell({row, col, value: event.key, keyCode: event.keyCode})}
        >
            {(item.type === "mark" || item.value === "") ? (
                <Mark row={row} col={col} marks={item.value} removed={item.removed} toggleMark={toggleMark}/>
            ) : (
                <SingleValue value={item.value} />
            )}
        </div>
    </td>
)

export default Cell;
