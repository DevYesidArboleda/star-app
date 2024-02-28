import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import { UseWindowSize } from "@/hooks/UseWindowSize";
import { NavBar } from "../ui";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalCart: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const windowSize = UseWindowSize();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={windowSize.width > 500 ? { x: "100%", opacity: 0 } : undefined}
        animate={windowSize.width > 500 ? { x: 0, opacity: 1 } : undefined}
        exit={windowSize.width > 500 ? { x: "100%", opacity: 0 } : undefined}   // Establecer la opacidad en 0 al salir
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `${windowSize.width <= 500 ? "#E7ECEF": "rgba(0, 0, 0, 0.1)"}`,
            display: "flex",
            alignItems: "start",
            justifyContent: "end",
            flexDirection: `${windowSize.width <= 500 ? "column": "row"}`,
            height:`${windowSize.width <= 500 ? "100dvh": ""}`,
            zIndex:1,
        }}
      >
        <div className={`${windowSize.width <= 500 ? "flex w-full h-9": "hidden"}`}>
            <NavBar />
          </div>
        <motion.div
          initial={ windowSize.width > 500 ?{ opacity: 0, x: 50 } : undefined}
          animate={ windowSize.width > 500 ? { opacity: 1, x: 0 } : undefined}
          exit={ windowSize.width > 500 ? { opacity: 0, x: 50 } : undefined}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            background: `${windowSize.width <= 500 ? "#E7ECEF": "white"}`,
            padding: `${windowSize.width <= 500 ? "16px": "20px"}`,
            borderRadius: "8px",
            width: `${windowSize.width <= 500 ? "100%": "380px"}`,
            height: "100dvh",
          }}
        >          
          <div className={`${windowSize.width <= 500 ? "flex justify-star": "flex justify-end"}`}>
            <button onClick={onClose}><Image src={`${windowSize.width <= 500 ? "/img/backToPage.svg": "/img/closeTablet.svg"}`} alt="" width={20} height={20}  /></button>
            <span className= {`${windowSize.width <= 500 ? "text-black font-bold text-base w-[90%] items-center justify-center flex ": "hidden"}`}>Carrito de compra</span>
          </div>
          {children}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCart;