import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientItemPropTypes } from "../../utils/constants";
import { data } from "../../utils/data";

const BurgerConstructor = ({ openWindow }) => {
  return (
    <section className={styles.container}>
      <div className={styles.locked}>
        <ul className={styles.list}>
          <li className={styles.element + " mb-4 mr-2 ml-4 pl-8"}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={data[0].name + " (верх)"}
              price={data[0].price}
              thumbnail={data[0].image}
            />
          </li>
          <div className={styles.ingredients}>
            <ul className={styles.list}>
              {data.map((e, i) =>
                e.type !== "bun" ? (
                  <li className={styles.element + " mb-4 mr-2 ml-4"} key={i}>
                    <DragIcon type="primary" />
                    <ConstructorElement text={e.name} price={e.price} thumbnail={e.image} />
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <li className={styles.element + " mr-2 ml-4 pl-8"}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={data[0].name + " (низ)"}
              price={data[0].price}
              thumbnail={data[0].image}
            />
          </li>
        </ul>
      </div>
      <div className={styles.order + " pt-10 pr-4 pl-4"}>
        <div className={styles.flex + " mr-10"}>
          <p className="pr-2 text text_type_digits-medium">
            {data.filter((e) => e.type !== "bun").reduce((sum, e) => sum + e.price, 0) + data[0].price * 2}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openWindow}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientItemPropTypes.isRequired).isRequired,
  openWindow: PropTypes.func.isRequired,
};

export default BurgerConstructor;
