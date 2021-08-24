import React from "react";
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const OrderDetails = ({ onClose }) => {
  const order = useSelector((store) => store.order);
  return (
    <div className={styles.container}>
      <div className={styles.flex} onClick={onClose}>
        <p className="text text_type_digits-large mt-20">{order.number}</p>
        <div className="text text_type_main-medium mt-8">идентификатор заказа</div>
        <div className="mb-25 mt-25 pt-1 pb-1">
          <CheckMarkIcon type="primary" />
        </div>
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-20">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
