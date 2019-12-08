/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Mark from './Mark';
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
      item, hasFocus, onKeyUp, onFocus, onBlur, onMarkClick,
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
          tabIndex={hasFocus ? 0 : 1}
          className="sudoku-cell-container"
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
        >
          {(item.type === 'mark') ? (
            <Mark
              marks={item.value}
              removed={item.removed}
              onMarkClick={onMarkClick}
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
