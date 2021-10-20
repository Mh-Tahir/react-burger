import React, { useState, useEffect, useCallback, FC } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import { useDrop } from "react-dnd";
import { getOrderDetails } from "../../services/actions";
import { BurgerConstructorElement } from "./burger-constructor-element";
import { DELETE_ELEMENT, ADD_ELEMENT, MOVE_ELEMENT } from "../../services/actions";
import update from "immutability-helper";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../services/auth";
import { TIngredient } from "../../services/actions";
import { RootState } from "../../services/types";

type TProps = {
  openWindow: () => void;
};

const BurgerConstructor: FC<TProps> = ({ openWindow }) => {
  const dispatch = useDispatch();
  const elements = useSelector((store: RootState) => store.order.elements);
  const [cards, setCards] = useState<TIngredient[]>(elements);
  const history = useHistory();
  const signIn: string = getCookie("accessToken") || "";

  useEffect(() => {
    setCards(elements);
  }, [elements]);

  const formOrder = () => {
    openWindow();
    const [bun] = elements.filter((e: TIngredient) => e.type === "bun");
    const orderElements = [...elements, bun];
    dispatch(getOrderDetails(orderElements, signIn));
  };
  const deleteElement = (e: TIngredient) => {
    dispatch({ type: DELETE_ELEMENT, id: e._id });
  };
  const [, dropTarget] = useDrop({
    accept: "e",
    drop(element) {
      dispatch({ type: ADD_ELEMENT, element: element });
    },
  });
  const [, dropTargetInOrder] = useDrop({
    accept: "inOrder",
    drop(element) {
      dispatch({
        type: MOVE_ELEMENT,
        cards: cards,
      });
    },
  });
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );
  const handleOrder = () => {
    if (elements.find((e: TIngredient) => e.type === "bun")) {
      if (signIn) {
        formOrder();
      } else {
        history.push("/login");
      }
    }
  };
  return (
    <section className={styles.container}>
      <div ref={dropTarget} className={styles.locked}>
        <ul className={styles.list}>
          {elements.map(
            (e: TIngredient) =>
              e.type === "bun" && (
                <li className={styles.element + " mb-4 mr-2 ml-4 pl-8"} key={e._id + "1"}>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={e.name + " (верх)"}
                    price={e.price}
                    thumbnail={e.image}
                  />
                </li>
              )
          )}
          <div ref={dropTargetInOrder} className={styles.ingredients}>
            <ul className={styles.list}>
              {!elements.length && <li className={styles.space + " text text_type_main-large"}></li>}
              {elements.map((e: TIngredient, i: number) =>
                e.type !== "bun" ? (
                  <BurgerConstructorElement
                    key={i}
                    e={e}
                    onClose={() => deleteElement(e)}
                    index={i}
                    id={e._id}
                    moveCard={moveCard}
                  />
                ) : null
              )}
            </ul>
          </div>
          {elements.map(
            (e: TIngredient) =>
              e.type === "bun" && (
                <li className={styles.element + " mr-2 ml-4 pl-8"} key={e._id + "2"}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={e.name + " (низ)"}
                    price={e.price}
                    thumbnail={e.image}
                  />
                </li>
              )
          )}
        </ul>
      </div>
      <div className={styles.order + " pt-10 pr-4 pl-4"}>
        <div className={styles.flex + " mr-10"}>
          <p className="pr-2 text text_type_digits-medium">
            {elements
              .filter((e: TIngredient) => e.type !== "bun")
              .reduce((sum: number, e: TIngredient) => sum + e.price, 0) +
              elements
                .filter((e: TIngredient) => e.type === "bun")
                .reduce((sum: number, e: TIngredient) => sum + e.price * 2, 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
