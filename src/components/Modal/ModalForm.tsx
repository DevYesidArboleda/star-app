import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import { UseWindowSize } from "@/hooks/UseWindowSize";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalForm: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const windowSize = UseWindowSize();

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
          background: `${windowSize.width <= 500 ? "#E7ECEF": "rgba(0, 0, 0, 0.6)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height:`${windowSize.width <= 500 ? "100dvh": ""}`,
          zIndex:`${windowSize.width <= 500 ? 40: 1}`,
        }}
      >
        <button className={`w-full flex justify-star pl-[11px] mb-2 ${windowSize.width <= 500 ? "": "hidden"}`} onClick={onClose}><Image src="/img/backToPage.svg" alt="" width={20} height={20} /></button>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            background: "white",
            padding: `${windowSize.width <= 500 ? "16px": "20px"}`,
            borderRadius: "8px",
            width: `${windowSize.width <= 500 ? "95%": "380px"}`,
          }}
        >
          <button className={`w-full flex justify-end ${windowSize.width <= 500 ? "hidden": ""}`} onClick={onClose}><Image src="/img/close.png" alt="" width={24} height={24} /></button>
          {children}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalForm;