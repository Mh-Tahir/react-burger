import React from "react";
import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useRouteMatch } from "react-router-dom";

const AppHeader = () => {
  const mainMatch = useRouteMatch("/");
  const ordersMatch = useRouteMatch("/orders");
  const profileMatch = useRouteMatch("/profile");
  const ordersHistoryMatch = useRouteMatch("/profile/orders");
  const current = (match) => (match ? match.isExact : false);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logomenu}>
          <nav className={styles.menu}>
            <Link to="/" className={styles.btn + " p-5 mt-4 mb-4 mr-2"}>
              <BurgerIcon type={current(mainMatch) ? "primary" : "secondary"} />
              <p className={`pl-2 text text_type_main-default  + ${current(mainMatch) ? "" : "text_color_inactive"}`}>
                Конструктор
              </p>
            </Link>
            <Link to="/orders" className={styles.btn + " p-5  mt-4 mb-4"}>
              <ListIcon type={current(ordersMatch) ? "primary" : "secondary"} />
              <p className={`pl-2 text text_type_main-default  + ${current(ordersMatch) ? "" : "text_color_inactive"}`}>
                Лента заказов
              </p>
            </Link>
          </nav>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Link to="/profile" className={styles.btn + " p-5 mt-4 mb-4"}>
          <ProfileIcon type={current(profileMatch) || current(ordersHistoryMatch) ? "primary" : "secondary"} />
          <p
            className={`pl-2 text text_type_main-default  + ${
              current(profileMatch) || current(ordersHistoryMatch) ? "" : "text_color_inactive"
            }`}
          >
            Личный кабинет
          </p>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
