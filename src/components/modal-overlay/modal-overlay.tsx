import React, { FC } from "react";
import styles from "./modal-overlay.module.css";
import {} from "@ya.praktikum/react-developer-burger-ui-components";

type TProps = {
  onClose: () => void;
};

const ModalOverlay: FC<TProps> = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose}></div>;
};

export default ModalOverlay;
