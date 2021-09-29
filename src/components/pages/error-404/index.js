import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <div className="mt-30 text text_type_main-large text_color_inactive">Ошибка 404: страница не найдена</div>
      <div className="mt-10 text text_type_main-large">
        <span className="text_color_inactive">Но Вы можете </span>
        <Link to="/">перейти на главную страницу</Link>
      </div>
    </div>
  );
};

export default Error404;
