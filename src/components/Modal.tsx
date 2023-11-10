import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? "visible bg-black/20": "invisible"}`} onClick={onClose}>
      <div className={`bg-white rounded-lg shadow p-6 w-[380px] ${isOpen ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e)=>e.stopPropagation()}>
        <button className='text-black flex w-full justify-end' onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  )
};

export default Modal;