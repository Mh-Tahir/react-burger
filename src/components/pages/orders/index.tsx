import React, { useEffect, useState, FC } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { signOut } from "../../../services/auth";
import { SIGN_OUT, TOrder } from "../../../services/actions";
import { FeedElement } from "../../feed-info/feed-element";
import { getCookie } from "../../../services/auth";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../../services/actions";
import { useSelector, useDispatch } from "../../../services/hooks";
import { RootStateOrAny } from "react-redux";

const Orders: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { messages } = useSelector((store: RootStateOrAny) => store.messages);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const token: string = getCookie("accessToken")?.split(" ")[1] || "";

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      dispatch({ type: SIGN_OUT });
      history.replace({ pathname: "/login" });
    } else {
      console.log(result.message);
    }
  };

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${token}` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, token]);

  useEffect(() => {
    if (messages[0]?.orders) {
      setOrders(messages[0].orders);
    }
  }, [messages]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flex + " pt-30"}>
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
            <div className={styles.info + " pt-20 text text_type_main-default text_color_inactive"}>
              В этом разделе вы можете просмотреть свою историю заказов
            </div>
          </aside>
        </div>
        <div className={styles.orders + " pt-10"}>
          {orders.length ? (
            orders.map((e: TOrder) =>
              e?.ingredients?.length ? <FeedElement key={e._id} order={e} status={"done"} /> : null
            )
          ) : (
            <p className="text text_type_main-medium pt-4 pr-20">Здесь будут ваши заказы</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
