import React from 'react';
import Cell from './Cell';
import Mark from './Mark';


const Grid = ({ sudoku }) => (
    <table style={{margin: "0 auto", borderSpacing: "0px", borderCollapse: "collapse" }}>
        <tbody>
            {sudoku.map((row, i) => {
                return (
                    <tr>
                        {row.map((value, j) => {
                            return (value) ? <Cell value={value}/> : <Mark marks={[1, 2, 4, 8, 9]}/>
                        })}
                    </tr>
                )
            })}
        </tbody>
    </table>
);


export default Grid;
