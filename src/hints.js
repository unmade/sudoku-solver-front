const messages = [
  {
    title: 'Pencil Marking',
    description: 'Pencil Marking is a technique where you would fill all the candidates for'
      + ' a given cell',
  },
  {
    title: 'Lone Single',
    description: 'Lone Single is a cell with only one possible candidate in it',
  },
  {
    title: 'Hidden Single',
    description: 'Hidden Single is a candidate that appears with others, but only once in'
      + ' a given row, column or box',
  },
  {
    title: 'Locked Candidate',
    description: 'Locked Candidate is a candidate limited to a row or column within a block',
  },
  {
    title: 'Naked Pair',
    description: 'Naked Pair is two cells in a row, column or block, which together contain only'
      + ' the same two candidates. These candidates can be excluded from other cells in the same'
      + ' row, column or block.',
  },
  {
    title: 'XY Wing',
    description: 'XY Wing is 3 different cells – each with exactly two candidates – that are'
      + ' related to each other in such a way that you can make some logical conclusions.',
  },
  {
    title: 'Unique Rectangle',
    description: 'Unique Rectangle is a rectangle of four unsolved cells, where three of the these'
      + ' cells have the exact same two pencil marks in them, you can remove those pencil marks'
      + 'from the fourth cell completely.',
  },
];


export default function getHintMessage(name) {
  const [message] = messages.filter((item) => item.title === name);
  if (message) {
    return message;
  }
  return { title: name, description: '' };
}
