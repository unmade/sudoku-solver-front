import React from 'react';
import "./Grid.css";
import CellContainer from '../containers/CellContainer';


const Grid = ({ sudoku }) => (
    <table className="sudoku">
        <tbody>
            {sudoku.map((row, i) => (
                <tr key={i}>
                    {row.map((item, j) => (
                        <CellContainer row={i} col={j} key={j}/>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);


export default Grid;
