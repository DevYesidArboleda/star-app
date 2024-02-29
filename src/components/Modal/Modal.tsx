import React, { ReactNode } from 'react';
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors paddinCero ${isOpen ? "visible bg-black/20": "invisible"}`} onClick={onClose}>
      <div className={`flex flex-col bg-white rounded-lg shadow md:p-6 p-2 md:w-[380px] w-[320px] ${isOpen ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e)=>e.stopPropagation()}>
        <button className=' text-black flex w-full justify-end z-10' onClick={onClose}>
          <Image src="/img/close.png" alt="" width={24} height={24} />
        </button>
        {children}
      </div>
    </div>
  )
};

export default Modal;