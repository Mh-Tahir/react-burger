import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

const App = () => {
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [element, setElement] = useState({});
  const [data, setData] = useState([]);
  const URL = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    const getData = async () => {
      fetch(URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else return Promise.reject(new Error("Ошибка"));
        })
        .then((res) => setData(res.data))
        .catch((e) => console.log(e.message));
    };
    getData();
  }, []);

  const openIngredientDetails = (e) => {
    setIngredientDetailsOpen(!isIngredientDetailsOpen);
    setElement(e);
  };

  const openOrderDetails = () => {
    setOrderDetailsOpen(!isOrderDetailsOpen);
  };

  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients data={data} openWindow={openIngredientDetails} />
        <BurgerConstructor openWindow={openOrderDetails} />
      </main>
      {isIngredientDetailsOpen && (
        <Modal onClose={() => setIngredientDetailsOpen(false)}>
          <IngredientDetails data={element} onClose={setIngredientDetailsOpen} />
        </Modal>
      )}
      {isOrderDetailsOpen && (
        <Modal onClose={() => setOrderDetailsOpen(false)}>
          <OrderDetails onClose={setOrderDetailsOpen} />
        </Modal>
      )}
    </>
  );
};

export default App;
