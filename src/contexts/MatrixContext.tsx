import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { Matrix, MatrixParams, MatrixContextType } from '../types';

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

const generateInitialMatrix = (rows: number, cols: number): Matrix => {
  let id = 1;

  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      id: id++,
      amount: Math.floor(Math.random() * 100) + 1,
    }))
  );
};

interface MatrixProviderProps {
  children: React.ReactNode;
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const [params, setParams] = useState<MatrixParams>({ m: 0, n: 0, x: 0 });
  const [matrix, setMatrix] = useState<Matrix>([]);

  useEffect(() => {
    if (params.m > 0 && params.n > 0) {
      setMatrix(generateInitialMatrix(params.m, params.n));
    }
  }, [params.m, params.n]);

  const incrementCell = useCallback((rowIndex: number, colIndex: number) => {
    setMatrix((prev) => {
      const newMatrix = [...prev];

      newMatrix[rowIndex] = [...newMatrix[rowIndex]];
      newMatrix[rowIndex][colIndex] = {
        ...newMatrix[rowIndex][colIndex],
        amount: newMatrix[rowIndex][colIndex].amount + 1,
      };

      return newMatrix;
    });
  }, []);

  const getRowSum = useCallback(
    (rowIndex: number): number => {
      return matrix[rowIndex].reduce((sum, cell) => sum + cell.amount, 0);
    },
    [matrix]
  );

  const getColPersentile = useCallback(
    (colIndex: number): number => {
      const colValues = matrix.map((row) => row[colIndex].amount).sort((a, b) => a - b);
      const mid = Math.floor(colValues.length / 2);

      return colValues.length % 2 === 0
        ? (colValues[mid - 1] + colValues[mid]) / 2
        : colValues[mid];
    },
    [matrix]
  );

  const getNearestCells = useCallback(
    (targetAmount: number): [number, number][] => {
      const differences: Array<{
        diff: number;
        row: number;
        col: number;
      }> = [];

      matrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          differences.push({
            diff: Math.abs(cell.amount - targetAmount),
            row: rowIndex,
            col: colIndex,
          });
        });
      });

      return differences
        .sort((a, b) => a.diff - b.diff)
        .slice(0, params.x)
        .map((item) => [item.row, item.col]);
    },
    [matrix, params.x]
  );

  const removeRow = useCallback((rowIndex: number) => {
    setMatrix((prev) => prev.filter((_, index) => index !== rowIndex));
  }, []);

  const addRow = useCallback(() => {
    setMatrix((prev) => {
      const newRow = Array.from({ length: prev[0].length }, (_, i) => ({
        id: Math.max(...prev.flat().map((cell) => cell.id)) + i + 1,
        amount: Math.floor(Math.random() * 100) + 1,
      }));

      return [...prev, newRow];
    });
  }, []);

  return (
    <MatrixContext.Provider
      value={{
        params,
        setParams,
        matrix,
        incrementCell,
        getRowSum,
        getColPersentile,
        getNearestCells,
        removeRow,
        addRow,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => {
  const context = useContext(MatrixContext);

  if (!context) {
    throw new Error('useMatrix muset be used within a MatrixProvider');
  }

  return context;
};
