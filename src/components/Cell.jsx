/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Candidates from './Candidates';
import SingleValue from './SingleValue';
import './Cell.css';


class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.cellRef = React.createRef();
  }

  shouldComponentUpdate(nextProps) {
    const { item } = this.props;
    return item !== nextProps.item;
  }

  componentDidUpdate() {
    const { hasFocus } = this.props;
    if (hasFocus) {
      this.cellRef.current.focus();
    }
  }

  render() {
    const {
      item, boxSize, onKeyUp, onFocus, onBlur, onCandidateClick,
    } = this.props;

    const className = (
      (item.isSelected ? ' sudoku-cell-selected' : '')
      + (item.isIntersected && !item.isSelected ? ' sudoku-cell-intersected' : '')
      + (item.incorrect ? ' sudoku-cell-incorrect' : '')
    );

    return (
      <td className={`sudoku-cell ${className}`}>
        <div
          ref={this.cellRef}
          tabIndex={0}
          className="sudoku-cell-container"
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
        >
          {(item.value === null) ? (
            <Candidates
              boxSize={boxSize}
              candidates={item.candidates}
              removed={item.removed}
              onCandidateClick={onCandidateClick}
            />
          ) : (
            <SingleValue value={item.value} />
          )}
        </div>
      </td>
    );
  }
}


export default Cell;
