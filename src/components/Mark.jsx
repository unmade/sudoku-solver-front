import React from "react";
import "./Mark.css";


const Mark = ({ row, col, marks, toggleMark }) => (
    <td className="sudoku-marks">
        <div className="sudoku-marks-container">
            {[...Array(3)].map((e, i) => {
                return (
                    <div>
                        {[...Array(3)].map((e, j) => {
                            const value = Math.floor(i % 3) * 3 + Math.floor(j % 3) + 1;
                            return (
                                marks.indexOf(value) > -1 ? (
                                    <span onClick={toggleMark({row, col, value})} className="sudoku-mark-selected">{value}</span>
                                ) : (
                                    <span onClick={toggleMark({row, col, value})} className="sudoku-mark-deselected">{value}</span>
                                )
                            )
                        })}
                    </div>
                )
            })}
        </div>
    </td>
);


export default Mark;
