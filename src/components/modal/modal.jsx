import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

const Modal = ({ children, onClose }) => {
  React.useEffect(() => {
    window.addEventListener("keydown", (e) => (e.code === "Escape" ? onClose() : null));
    return () => {
      window.removeEventListener("keydown", (e) => (e.code === "Escape" ? onClose() : null));
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
      <ModalOverlay className={styles.overlay} onClose={onClose} />
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
