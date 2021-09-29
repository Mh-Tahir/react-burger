import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../../../services/auth";
import { SIGN_OUT } from "../../../services/actions";

const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      dispatch({ type: SIGN_OUT });
      history.replace({ pathname: "/login" });
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className={styles.flex + " pt-30"}>
      <div className={styles.flex}>
        <aside className={styles.aside + " pl-5 pr-15"}>
          <div className={styles.link + " text text_type_main-medium text_color_inactive"}>
            <Link to="/profile">Профиль</Link>
          </div>
          <div className={styles.link + " text text_type_main-medium"}>
            <Link to="/profile/orders">История заказов</Link>
          </div>
          <div onClick={handleSignOut} className={styles.link + " text text_type_main-medium text_color_inactive"}>
            <Link to="/login">Выход</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Orders;
