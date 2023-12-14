// Modal.js
import React, { ReactNode, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }
  
  const ErrorModel: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
      <div className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? "visible bg-black/20": "invisible"}`} onClick={onClose}>
        <div className={`bg-white rounded-lg shadow p-2 w-[440px] ${isOpen ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e)=>e.stopPropagation()}>          
          {children}
          <button className='text-black text-sm flex w-full justify-end p-8 pt-0' onClick={onClose}>Aceptar</button>
        </div>
      </div>
    )
  };
  
  export default ErrorModel;