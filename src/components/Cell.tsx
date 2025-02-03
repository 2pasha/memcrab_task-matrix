import React from 'react';
import { CellProps } from '../types';
import '../styles/Cell.css';

const Cell: React.FC<CellProps> = ({
  cell,
  rowIndex,
  colIndex,
  isHighlighted,
  showPercentage,
  percentageValue,
  heatmapPercentage,
  onCellClick,
  onCellHover,
}) => {
  return (
    <td
      className={`matrix__cell ${isHighlighted ? 'matrix__cell--highlighted' : ''}`}
      onClick={onCellClick}
      onMouseEnter={onCellHover}
    >
      <span className="matrix__cell-content">
        {showPercentage ? `${percentageValue?.toFixed(1)}%` : cell.amount}
      </span>
      {heatmapPercentage !== undefined && (
        <div className="matrix__cell-heatmap" style={{ width: `${heatmapPercentage}%` }} />
      )}
    </td>
  );
};

export default React.memo(Cell);
