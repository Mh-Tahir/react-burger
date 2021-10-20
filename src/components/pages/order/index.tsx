import React, { useState, useEffect, FC } from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "../../../services/hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderData, TIngredient } from "../../../services/actions";
import { getDate } from "../../../services/utils";
import { RootState } from "../../../services/types";
import { RootStateOrAny } from "react-redux";

const Order: FC = () => {
  const dispatch = useDispatch();
  const [elements, setElements] = useState<TIngredient[]>([]);
  const [price, setPrice] = useState<number>(0);
  const { ingredients } = useSelector((store: RootState) => store.ingredients);
  const { order } = useSelector((store: RootStateOrAny) => store.orderData);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getOrderData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ingredients.length) {
      let total = 0;
      order?.ingredients?.forEach((e: string) => {
        let element = ingredients.filter((el: TIngredient) => el._id === e)[0];
        total += element.price;
      });

      setPrice(total);

      let elementsSet = new Set();
      let elementsArr: TIngredient[] = [];
      order?.ingredients?.forEach((e: TIngredient) => elementsSet.add(e));
      elementsSet.forEach((el) => elementsArr.push(ingredients.filter((e: TIngredient) => e._id === el)[0]));
      elementsArr.forEach((el) => (el.count = order.ingredients.filter((e: string) => e === el._id).length));

      setElements(elementsArr);
    }
  }, [ingredients, order]);

  return (
    <section className={styles.container}>
      <h1 className={styles.number + " text text_type_digits-default pt-4"}>{"#" + order.number}</h1>
      <p className="text text_type_main-medium pt-10">{order.name}</p>
      <p className="text text_type_main-default pt-2">
        <span style={{ color: order.status === "done" ? "#00CCCC" : "#FFFFFF" }}>
          {order.status === "done" ? "Выполнен" : "created" ? "Создан" : "pending" ? "Готовится" : false}
        </span>
      </p>
      <p className="text text_type_main-medium pt-15 pb-4">Состав:</p>
      <div className={styles.details + " pr-2"}>
        {elements &&
          elements.map((e, i) => {
            return (
              <div key={i} className={styles.dflex + " mt-4 pb-2"}>
                <div className={styles.flex}>
                  <div className={styles.icon + " mr-4"}>
                    <img className={styles.image} src={e.image_mobile} alt="" />
                  </div>
                  <div className="text text_type_main-default">{e.name}</div>
                </div>
                <div className={styles.flex + " text text_type_digits-default"}>
                  <span className="pr-2">
                    {(e.count || 0) > 1 && e.count + " x "}
                    {e.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
      </div>
      <footer className={styles.dflex + " mt-10 pr-2 pb-4"}>
        <p className="text text_type_main-default text_color_inactive">{getDate(order.createdAt)}</p>
        <div className={styles.flex + " text text_type_digits-default"}>
          <span className="pr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </footer>
    </section>
  );
};

export default Order;
