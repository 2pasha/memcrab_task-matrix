import React, { useState } from 'react';
import { MatrixProvider, useMatrix } from './contexts/MatrixContext';
import { Matrix } from './components/Matrix';
import Controls from './components/Controls';
import './styles/App.css';
import './styles/font.css';
import Modal from './components/Modal';

export const AppContent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMatrixGenerated, setIsMatrixGenerated] = useState(false);
  const { matrix, params } = useMatrix();

  const handleMatrixGenerate = () => {
    setShowModal(false);
    setIsMatrixGenerated(true);
  };

  const handleEditMatrix = () => {
    setShowModal(true);
  };

  const getCurrentDimensions = () => {
    if (!matrix.length) {
      return null;
    }

    return {
      m: params.m,
      n: params.n,
      x: params.x,
    };
  };

  return (
    <div className="app">
      <h1 className="app__title">Interactive Matrix</h1>

      {!isMatrixGenerated && (
        <button className="app__generate-button" onClick={() => setShowModal(true)}>
          Generate New Matrix
        </button>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Matrix Settings">
        <Controls onGenerate={handleMatrixGenerate} initialValues={getCurrentDimensions()} />
      </Modal>

      {isMatrixGenerated && <Matrix onEditMatrix={handleEditMatrix} />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <MatrixProvider>
      <AppContent />
    </MatrixProvider>
  );
};
