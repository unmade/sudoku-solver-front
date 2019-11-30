import React from "react";
import "./Mark.css";


const Mark = ({ row, col, marks, removed, toggleMark }) => (
    <div className="sudoku-marks-container">
        {[...Array(3)].map((e, i) => (
            <div key={i}>
                {[...Array(3)].map((e, j) => {
                    const value = Math.floor(i % 3) * 3 + Math.floor(j % 3) + 1;
                    if (removed && removed.indexOf(value) > -1) {
                        return <span className="sudoku-mark-removed" key={j}>{value}</span>
                    }
                    return (
                        marks.indexOf(value) > -1 ? (
                            <span onClick={() => toggleMark({row, col, value})} className="sudoku-mark-selected" key={j}>{value}</span>
                        ) : (
                            <span onClick={() => toggleMark({row, col, value})} className="sudoku-mark-deselected" key={j}>{value}</span>
                        )
                    )
                })}
            </div>
            )
        )}
    </div>
)


export default Mark;
