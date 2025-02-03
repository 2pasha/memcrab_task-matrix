import React, { useState } from 'react';
import { useMatrix } from '../contexts/MatrixContext';
import '../styles/Matrix.css';
import Cell from './Cell';

interface MatrixProps {
  onEditMatrix: () => void;
}

export const Matrix: React.FC<MatrixProps> = ({ onEditMatrix}) => {
  const { matrix, getNearestCells, getRowSum, getColPersentile, incrementCell, removeRow, addRow } =
    useMatrix();

  const [highlightedCells, setHighlightedCells] = useState<[number, number][]>([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  if (!matrix.length) {
    return <div className="matrix__empty">Please set matrix dimensions first</div>;
  }

  const handleIsHighlighted = (rowIndex: number, colIndex: number) => {
    return highlightedCells.some(([r, c]) => r === rowIndex && c === colIndex);
  };

  const handleShowPercentage = (rowIndex: number) => {
    return hoveredRowIndex === rowIndex;
  };

  const handlePercentageValue = (rowIndex: number, colIndex: number) => {
    return hoveredRowIndex === rowIndex ? getRowPercentage(rowIndex)[colIndex] : undefined;
  };

  const handleHeatmapPercentage = (rowIndex: number, colIndex: number) => {
    return hoveredRowIndex === rowIndex ? getHeatmapPercentages(rowIndex)[colIndex] : undefined;
  };

  const getRowPercentage = (rowIndex: number) => {
    const sum = getRowSum(rowIndex);

    return matrix[rowIndex].map((cell) => (cell.amount / sum) * 100);
  };

  const getHeatmapPercentages = (rowIndex: number) => {
    const maxInRow = Math.max(...matrix[rowIndex].map((cell) => cell.amount));

    return matrix[rowIndex].map((cell) => (cell.amount / maxInRow) * 100);
  };

  const handleCellHover = (rowIndex: number, colIndex: number) => {
    const nearest = getNearestCells(matrix[rowIndex][colIndex].amount);

    setHighlightedCells(nearest);
  };

  const handleSumCellHover = (rowIndex: number) => {
    setHoveredRowIndex(rowIndex);
  };

  const handleSumCellLeave = () => {
    setHoveredRowIndex(null);
  };

  return (
    <div className="matrix">
      <div className="matrix__controls">
        <button
          className={`matrix__add-button ${
            matrix.length >= 100 ? 'matrix__add-button--disabled' : ''
          }`}
          onClick={addRow}
          disabled={matrix.length >= 100}
          title={matrix.length >= 100 ? 'Maximum number of rows reached (100)' : 'Add new row'}
        >
          Add row
        </button>
        <button
          className="matrix__edit-button"
          onClick={onEditMatrix}
          title="Edit matrix settings"
        >
          Edit Matrix
        </button>
      </div>

      <div className="matrix__table-container">
        <table className="matrix__table">
          <thead className="matrix__header">
            <tr className="matrix__header-cells">
              {matrix[0].map((_, colIndex) => (
                <th key={colIndex} className="matrix__header-cell">
                  Column {colIndex + 1}
                </th>
              ))}
              <th className="matrix__header-cell matrix__header-cell--sum">Sum</th>
            </tr>
          </thead>

          <tbody className="matrix__body">
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex} className="matrix__row">
                {row.map((cell, colIndex) => (
                  <Cell
                    key={cell.id}
                    cell={cell}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isHighlighted={handleIsHighlighted(rowIndex, colIndex)}
                    showPercentage={handleShowPercentage(rowIndex)}
                    percentageValue={handlePercentageValue(rowIndex, colIndex)}
                    heatmapPercentage={handleHeatmapPercentage(rowIndex, colIndex)}
                    onCellClick={() => incrementCell(rowIndex, colIndex)}
                    onCellHover={() => handleCellHover(rowIndex, colIndex)}
                  />
                ))}
                <td
                  className="matrix__sum-cell"
                  onMouseEnter={() => handleSumCellHover(rowIndex)}
                  onMouseLeave={handleSumCellLeave}
                >
                  {getRowSum(rowIndex)}
                  <button onClick={() => removeRow(rowIndex)} className="matrix__remove-button">
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
          <tfoot className="matrix__percentile-wrapper">
            <tr className="matrix__row matrix__row--percentile">
              {matrix[0].map((_, colIndex) => (
                <td key={colIndex} className="matrix__percentile-cell">
                  {getColPersentile(colIndex).toFixed(1)}
                </td>
              ))}
              <td className="matrix__percentile-cell matrix__percentile-cell--total">
                50th percentile
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
