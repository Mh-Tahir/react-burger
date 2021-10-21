import React, { useEffect, useState, FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { FeedElement } from "./feed-element";
import styles from "./feed.module.css";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions";
import { TOrder } from "../../services/actions";
import { RootStateOrAny } from "react-redux";

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store: RootStateOrAny) => store.messages);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [inOrder, setInOrder] = useState<TOrder[][]>([]);
  const [ready, setReady] = useState<TOrder[][]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "wss://norma.nomoreparties.space/orders/all" });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (messages[0]?.orders) {
      setOrders(messages[0].orders);
      setTotal(messages[0].total);
      setTotalToday(messages[0].totalToday);
    }
  }, [messages]);

  useEffect(() => {
    if (orders.length) {
      const inOrder = orders.filter((e: TOrder) => e.status === "created");
      const ready = orders.filter((e: TOrder) => e.status === "done");
      setInOrder(sliceByTen(inOrder));
      setReady(sliceByTen(ready));
    }
  }, [orders]);

  const sliceByTen = (arr: TOrder[]): TOrder[][] => {
    let newArr = [];
    for (let i = 0; i < arr.length; i += 10) {
      newArr.push(arr.slice(i, i + 10));
    }
    return newArr;
  };

  return (
    <div className={styles.wcontainer}>
      <header className={styles.header + " pl-4"}>
        <h1 className="text text_type_main-large pt-8 pb-6">Лента заказов</h1>
      </header>
      <section className={styles.wflex + " pl-4"}>
        <div className={styles.orders}>
          {orders.length &&
            orders.map((e: TOrder) =>
              e?.ingredients?.length ? <FeedElement key={e._id} order={e} status={false} /> : null
            )}
        </div>
        <div className={styles.data}>
          <div className={styles.sflex}>
            <section className="mr-8">
              <header className="text text_type_main-medium pb-6">Готовы:</header>
              <div className={styles.wrflex}>
                {ready.length && ready[0].length ? (
                  ready.map((elem: TOrder[], i: number) => (
                    <div key={i} className={styles.cflex + " mr-8 mb-8"}>
                      {elem.map((e: TOrder) => (
                        <span key={e.number} className={styles.ready + " text text_type_digits-default mb-2"}>
                          {e.number}
                        </span>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text text_type_main-medium text_color_inactive">нет</p>
                )}
              </div>
            </section>
            <section>
              <header className="text text_type_main-medium pb-6">В работе:</header>
              <div className={styles.wrflex}>
                {inOrder.length && inOrder[0].length ? (
                  inOrder.map((elem: TOrder[], i: number) => (
                    <div key={i} className={styles.cflex + " mr-8 mb-8"}>
                      {elem.map((e: TOrder) => (
                        <span key={e.number} className="text text_type_digits-default">
                          {e.number}
                        </span>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text text_type_main-medium">-</p>
                )}
              </div>
            </section>
          </div>
          <p className="text text_type_main-medium pt-10">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
          <p className="text text_type_main-medium pt-10">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </section>
    </div>
  );
};
