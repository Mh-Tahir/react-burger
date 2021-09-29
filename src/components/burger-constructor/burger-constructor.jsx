import React, { useState, useEffect, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { getOrderData } from "../../services/actions";
import { BurgerConstructorElement } from "./burger-constructor-element";
import { DELETE_ELEMENT, ADD_ELEMENT, MOVE_ELEMENT } from "../../services/actions";
import update from "immutability-helper";
import { useHistory } from "react-router-dom";

const BurgerConstructor = ({ openWindow }) => {
  const dispatch = useDispatch();
  const elements = useSelector((store) => store.order.elements);
  const [cards, setCards] = useState(elements);
  const history = useHistory();
  const { signIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setCards(elements);
  }, [elements]);

  const formOrder = () => {
    openWindow();
    dispatch(getOrderData(elements, signIn));
  };
  const deleteElement = (e) => {
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
    if (signIn) {
      formOrder();
    } else {
      history.push("/login");
    }
  };
  return (
    <section className={styles.container}>
      <div ref={dropTarget} className={styles.locked}>
        <ul className={styles.list}>
          {elements.map(
            (e) =>
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
              {elements.map((e, i) =>
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
            (e) =>
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
            {elements.filter((e) => e.type !== "bun").reduce((sum, e) => sum + e.price, 0) +
              elements.filter((e) => e.type === "bun").reduce((sum, e) => sum + e.price * 2, 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={elements.find((e) => e.type === "bun") ? handleOrder : null}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openWindow: PropTypes.func.isRequired,
};

export default BurgerConstructor;
