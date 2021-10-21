import React, { useEffect, useState, FC } from "react";
import { useSelector } from "../../services/hooks";
import { useLocation, Link } from "react-router-dom";
import styles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getDate } from "../../services/utils";
import { TIngredient, TOrder } from "../../services/actions";

type TProps = {
  order: TOrder;
  status: string | false;
};

export const FeedElement: FC<TProps> = (props) => {
  const { order, status } = props;
  const location = useLocation();
  const { ingredients } = useSelector((store) => store.ingredients);
  const [elements, setElements] = useState<TIngredient[]>([]);
  const [icons, setIcons] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const num: number = order.number;

  useEffect(() => {
    if (ingredients.length) {
      let total = 0;
      let elementsArr: TIngredient[] = [];
      order?.ingredients?.forEach((e) => {
        let elem: TIngredient = ingredients.filter((el: TIngredient) => el._id === e)[0];
        if (elem?.price) {
          elementsArr.push(elem);
          total += elem.price;
        }
      });
      setPrice(total);
      setElements(elementsArr);
    }
  }, [ingredients, order.ingredients]);

  useEffect(() => {
    let images: string[] = [];
    let elementsSet: Set<TIngredient> = new Set();
    elements.forEach((e: TIngredient) => elementsSet.add(e));
    elementsSet.forEach((el: TIngredient) => {
      images.push(el.image_mobile);
    });
    setIcons(images);
    setCount(images.length);
  }, [elements]);

  return (
    <Link
      key={num}
      to={{
        pathname: `${location.pathname}/${num}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <section className={styles.container + " p-6 mr-4 mb-4"}>
        <header className={styles.header}>
          <p className="text text_type_digits-default">{"#" + order.number}</p>
          <p className="text text_type_main-default text_color_inactive">{getDate(order.createdAt)}</p>
        </header>
        <div className="text text_type_main-medium pb-6 pt-6">
          {order.name}
          {status && (
            <div
              className="text text_type_main-default pt-2"
              style={{ color: order.status === "done" ? "#00CCCC" : "#FFFFFF" }}
            >
              {order.status === "done" ? "Выполнен" : "created" ? "Создан" : "pending" ? "Готовится" : false}
            </div>
          )}
        </div>
        <footer className={styles.dflex}>
          <div className={styles.flex}>
            {icons.map((e, i) => {
              let param = -i * 15;
              return i <= 4 ? (
                <div key={i} className={styles.image} style={{ left: param, zIndex: 100 - i }}>
                  <img className={styles.icon} src={e} alt="" />
                </div>
              ) : i === 5 ? (
                <div key={i} className={styles.image} style={{ left: param, zIndex: 100 - i }}>
                  <p className={styles.count + " text text_type_digits-default"}>{"+" + (count - 6)}</p>
                  <img className={styles.plusicon} src={e} alt="" />
                </div>
              ) : (
                false
              );
            })}
          </div>
          <div className={styles.flex}>
            <span className="text text_type_digits-default pr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </footer>
      </section>
    </Link>
  );
};
