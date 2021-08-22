import React from "react";
import styles from "./burger-ingredients.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

export const BurgerIngredientsElement = ({ e, openWindow }) => {
  const elements = useSelector((store) => store.order.elements);

  const count = (e) => {
    return e.type === "bun"
      ? elements.filter((element) => element._id === e._id).length * 2
      : elements.filter((element) => element._id === e._id).length;
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: "e",
    item: e,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <li ref={dragRef} className={styles.element + " ml-4 mr-2"} onClick={() => openWindow(e)}>
        {count(e) > 0 && <Counter count={count(e)} size="default" />}
        <img src={e.image} alt={e.name} className="pl-4 pr-4" width="240" />
        <div className={styles.price + " mt-1 mb-1"}>
          <p className="pr-1 text text_type_digits-default">{e.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.name + " text text_type_main-small"}>{e.name}</p>
      </li>
    )
  );
};

BurgerIngredientsElement.propTypes = {
  e: PropTypes.object.isRequired,
  openWindow: PropTypes.func.isRequired,
};
