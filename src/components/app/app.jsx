import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { getData } from "../../services/actions";
import { SET_ELEMENT, DELETE_ORDER } from "../../services/actions";

const App = () => {
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const openIngredientDetails = (e) => {
    setIngredientDetailsOpen(!isIngredientDetailsOpen);
    dispatch({ type: SET_ELEMENT, element: e });
  };

  const openOrderDetails = () => {
    setOrderDetailsOpen(!isOrderDetailsOpen);
  };

  const closeIngredientModal = () => {
    dispatch({ type: SET_ELEMENT, element: {} });
    setIngredientDetailsOpen(false);
  };

  const closeOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
    setOrderDetailsOpen(false);
  };

  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openWindow={openIngredientDetails} />
          <BurgerConstructor openWindow={openOrderDetails} />
        </DndProvider>
      </main>
      {isIngredientDetailsOpen && (
        <Modal onClose={() => closeIngredientModal()}>
          <IngredientDetails onClose={setIngredientDetailsOpen} />
        </Modal>
      )}
      {isOrderDetailsOpen && (
        <Modal onClose={() => closeOrderModal()}>
          <OrderDetails onClose={setOrderDetailsOpen} />
        </Modal>
      )}
    </>
  );
};

export default App;
