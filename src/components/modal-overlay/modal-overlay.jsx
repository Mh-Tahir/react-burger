import React from "react";
import styles from "./modal-overlay.module.css";
import {} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
