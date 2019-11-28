import React from 'react';
import CellContainer from '../containers/CellContainer';
import MarkContainer from '../containers/MarkContainer';
import "./Grid.css";


const Grid = ({ sudoku }) => (
    <table className="sudoku">
        <tbody>
            {sudoku.map((row, i) => {
                return (
                    <tr>
                        {row.map((item, j) => {
                            return (item.type === "cell") ? (
                                <CellContainer row={i} col={j}/>
                            ) : (
                                <MarkContainer row={i} col={j}/>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    </table>
);


export default Grid;
