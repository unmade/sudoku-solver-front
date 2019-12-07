/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Mark from './Mark';
import SingleValue from './SingleValue';
import './Cell.css';


class Cell extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { item } = this.props;
    return item !== nextProps.item;
  }

  render() {
    const {
      item, onKeyUp, onFocus, onBlur, onMarkClick,
    } = this.props;

    const className = (
      (item.isSelected ? ' sudoku-cell-selected' : '')
      + (item.isIntersected && !item.isSelected ? ' sudoku-cell-intersected' : '')
      + (item.incorrect ? ' sudoku-cell-incorrect' : '')
    );

    return (
      <td className={`sudoku-cell ${className}`}>
        <div
          tabIndex="0"
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
