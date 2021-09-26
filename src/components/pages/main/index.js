import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import OrderDetails from "../../order-details/order-details";
import Modal from "../../modal/modal";
import { useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { getData } from "../../../services/actions";
import { DELETE_ORDER } from "../../../services/actions";
import { useHistory } from "react-router-dom";

const Main = () => {
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const openIngredientDetails = (e) => {
    history.push(`/ingredients/${e._id}`, { background: history.location });
  };

  const openOrderDetails = () => {
    setOrderDetailsOpen(!isOrderDetailsOpen);
  };

  const closeOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
    setOrderDetailsOpen(false);
  };

  return (
    <>
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openWindow={openIngredientDetails} />
          <BurgerConstructor openWindow={openOrderDetails} />
        </DndProvider>
      </main>
      {isOrderDetailsOpen && (
        <Modal onClose={() => closeOrderModal()}>
          <OrderDetails onClose={setOrderDetailsOpen} />
        </Modal>
      )}
    </>
  );
};

export default Main;
