import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientItemPropTypes } from "../../utils/constants";

const BurgerIngredients = ({ data, openWindow }) => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <section className={styles.container}>
      <p className="mt-10 mb-5 text text_type_main-large">Соберите бургер</p>
      <nav className={styles.flex}>
        <Tab value="bun" active={current === "bun"} onClick={() => setCurrent("bun")}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={() => setCurrent("sauce")}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={() => setCurrent("main")}>
          Начинки
        </Tab>
      </nav>
      <div className={styles.ingredients}>
        <p className="mt-10 mb-6 text text_type_main-medium">Булки</p>
        <ul className={styles.list}>
          {data.map(
            (e) =>
              e.type === "bun" && (
                <li className={styles.element + " ml-4 mr-2"} key={e._id} onClick={() => openWindow(e)}>
                  <Counter count={1} size="default" />
                  <img src={e.image} alt={e.name} className="pl-4 pr-4" width="240" />
                  <div className={styles.price + " mt-1 mb-1"}>
                    <p className="pr-1 text text_type_digits-default">{e.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={styles.name + " text text_type_main-small"}>{e.name}</p>
                </li>
              )
          )}
        </ul>
        <p className="mt-10 mb-6 text text_type_main-medium">Соусы</p>
        <ul className={styles.list}>
          {data.map(
            (e) =>
              e.type === "sauce" && (
                <li className={styles.element + " ml-4 mr-2"} key={e._id} onClick={() => openWindow(e)}>
                  <Counter count={1} size="default" />
                  <img src={e.image} alt={e.name} className="pl-4 pr-4" width="240" />
                  <div className={styles.price + " mt-1 mb-1"}>
                    <p className="pr-1 text text_type_digits-default">{e.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={styles.name + " text text_type_main-small"}>{e.name}</p>
                </li>
              )
          )}
        </ul>
        <p className="mt-10 mb-6 text text_type_main-medium">Начинка</p>
        <ul className={styles.list}>
          {data.map(
            (e) =>
              e.type === "main" && (
                <li className={styles.element + " ml-4 mr-2"} key={e._id} onClick={() => openWindow(e)}>
                  <Counter count={1} size="default" />
                  <img src={e.image} alt={e.name} className="pl-4 pr-4" width="240" />
                  <div className={styles.price + " mt-1 mb-1"}>
                    <p className="pr-1 text text_type_digits-default">{e.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={styles.name + " text text_type_main-small"}>{e.name}</p>
                </li>
              )
          )}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientItemPropTypes.isRequired).isRequired,
  openWindow: PropTypes.func.isRequired,
};

export default BurgerIngredients;
