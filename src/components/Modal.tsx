import React from 'react';
import '../styles/Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}>
        <div className="modal__content" onClick={handleContentClick}>
          <div className="modal__header">
            <h2 className="moda__title">{title}</h2>
            <button className="modal__close" onClick={onClose}>x</button>
          </div>
          <div className="modal__body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
