import React from "react";
import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logomenu}>
          <nav className={styles.menu}>
            <a href="/" className={styles.btn + " p-5 mt-4 mb-4 mr-2"}>
              <BurgerIcon type="primary" />
              <p className="pl-2 text text_type_main-default">Конструктор</p>
            </a>
            <a href="/" className={styles.btn + " p-5  mt-4 mb-4"}>
              <ListIcon type="secondary" />
              <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
            </a>
          </nav>
          <Logo />
        </div>
        <a href="/" className={styles.btn + " p-5 mt-4 mb-4"}>
          <ProfileIcon type="secondary" />
          <p className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
