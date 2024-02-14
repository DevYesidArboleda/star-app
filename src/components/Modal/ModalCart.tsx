import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalCart: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ x: "100%", opacity: 0 }}  // Establecer la opacidad inicial en 0
        animate={{ x: 0, opacity: 1 }}       // Establecer la opacidad en 1 al animar
        exit={{ x: "100%", opacity: 0 }}     // Establecer la opacidad en 0 al salir
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "start",
            justifyContent: "end",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "380px",
          }}
        >
          <button onClick={onClose}><Image src="/img/close.png" alt="" width={24} height={24} /></button>
          {children}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCart;