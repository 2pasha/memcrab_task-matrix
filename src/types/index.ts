export type Cell = {
  id: number;
  amount: number;
};

export type MatrixRow = Cell[];

export type Matrix = MatrixRow[];

export interface MatrixParams {
  m: number;
  n: number;
  x: number;
}

export interface MatrixContextType {
  params: MatrixParams;
  setParams: (params: MatrixParams) => void;
  matrix: Matrix;
  incrementCell: (rowIndex: number, colIndex: number) => void;
  getRowSum: (rowIndex: number) => number;
  getColPersentile: (colIndex: number) => number;
  getNearestCells: (amount: number) => [number, number][];
  removeRow: (rowIndex: number) => void;
  addRow: () => void;
}

export interface CellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
  isHighlighted: boolean;
  showPercentage: boolean;
  percentageValue?: number;
  heatmapPercentage?: number;
  onCellClick: () => void;
  onCellHover: () => void;
}
