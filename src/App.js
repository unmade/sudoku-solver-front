import React from 'react';
import Grid from './components/Grid';

function App() {
  const sudoku = [
      [0, 0, 0, 0, 9, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 2, 3, 0, 0],
      [0, 0, 7, 0, 0, 1, 8, 2, 5],
      [6, 0, 4, 0, 3, 8, 9, 0, 0],
      [8, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 9, 0, 0, 0, 0, 0, 8],
      [1, 7, 0, 0, 0, 0, 6, 0, 0],
      [9, 0, 0, 0, 1, 0, 7, 4, 3],
      [4, 0, 3, 0, 6, 0, 0, 0, 1],
  ]
  return (
    <div style={{marginTop: "50px"}}>
      <Grid sudoku={sudoku}/>
    </div>
  );
}

export default App;
