import React from 'react';
import Cell from './Cell';
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
                                <Cell value={item.value}/>
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
