import React from "react";
import "./Mark.css";


const Mark = ({ marks }) => (
    <td className="sudoku-mark">
        {[...Array(3)].map((e, i) => {
            return (
                <div>
                    {[...Array(3)].map((e, j) => {
                        const value = Math.floor(i % 3) * 3 + Math.floor(j % 3) + 1;
                        console.log(value, marks.indexOf(value));
                        // console.log(value);
                        return (
                            marks.indexOf(value) > -1 && <span>{value}</span> || <span>&nbsp;</span>
                        )
                    })}
                </div>
            )
        })}
    </td>
);


export default Mark;
