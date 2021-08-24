import React, { useEffect, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { BurgerIngredientsElement } from "./burger-ingredients-element";

const BurgerIngredients = ({ openWindow }) => {
  const [current, setCurrent] = useState("bun");
  const { ingredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    const container = document.querySelector("[class^='burger-ingredients_ingredients']");
    function scrollBurgerIngredients() {
      const height = container.scrollTop;
      if (height >= 0 && height < 294) {
        setCurrent("bun");
      } else if (height >= 294 && height < 788) {
        setCurrent("sauce");
      } else {
        setCurrent("main");
      }
    }
    container.addEventListener("scroll", scrollBurgerIngredients);
    return () => {
      container.removeEventListener("scroll", scrollBurgerIngredients);
    };
  }, []);

  const tabClick = (tab) => {
    setCurrent(tab);
    const container = document.querySelector("[class^='burger-ingredients_ingredients']");
    const heights = { bun: 0, sauce: 295, main: 788 };
    container.scrollTop = heights[`${tab}`];
  };

  return (
    <section className={styles.container}>
      <p className="mt-10 mb-5 text text_type_main-large">Соберите бургер</p>
      <nav className={styles.flex}>
        <Tab value="bun" active={current === "bun"} onClick={() => tabClick("bun")}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={() => tabClick("sauce")}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={() => tabClick("main")}>
          Начинки
        </Tab>
      </nav>
      <div className={styles.ingredients}>
        <p className="mt-10 mb-6 text text_type_main-medium">Булки</p>
        <ul className={styles.list}>
          {ingredients.map(
            (e) => e.type === "bun" && <BurgerIngredientsElement openWindow={openWindow} e={e} key={e._id} />
          )}
        </ul>
        <p className="mt-10 mb-6 text text_type_main-medium">Соусы</p>
        <ul className={styles.list}>
          {ingredients.map(
            (e) => e.type === "sauce" && <BurgerIngredientsElement openWindow={openWindow} e={e} key={e._id} />
          )}
        </ul>
        <p className="mt-10 mb-6 text text_type_main-medium">Начинка</p>
        <ul className={styles.list}>
          {ingredients.map(
            (e) => e.type === "main" && <BurgerIngredientsElement openWindow={openWindow} e={e} key={e._id} />
          )}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  openWindow: PropTypes.func.isRequired,
};

export default BurgerIngredients;
