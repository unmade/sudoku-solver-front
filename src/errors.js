const codes = {
  invalid_puzzle: {
    title: 'Invalid Puzzle',
    description: 'Please check your puzzle - it should be a correct Sudoku with a single solution',
  },
  puzzle_solved: {
    title: 'Puzzle Solved',
    description: 'Puzzle is already solved - no hints available',
  },
  default: {
    title: 'Error',
    description: 'Something went wrong',
  },
};


export default function getMessageByCode(code) {
  const message = codes[code];
  if (message) {
    return message;
  }
  return codes.default;
}
