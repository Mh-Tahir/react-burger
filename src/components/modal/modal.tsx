import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal");

type TProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: FC<TProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => (e.code === "Escape" ? onClose() : null);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          {children}
          <div className={styles.btn + " mt-5 pt-10 pr-10"} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot as HTMLDivElement
  );
};

export default Modal;
