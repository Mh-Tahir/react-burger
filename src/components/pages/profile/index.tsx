import React, { useState, useEffect, useCallback, FC, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import styles from "./index.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { request, signOut } from "../../../services/auth";
import { SIGN_OUT } from "../../../services/actions";
import { RootStateOrAny } from "react-redux";
import { URL } from "../../../services/actions";

const Profile: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken } = useSelector((state: RootStateOrAny) => state.auth);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = useCallback(async () => {
    try {
      const result = await request(`${URL}/auth/user`, null, "GET", accessToken);
      if (result.success) {
        return { ...result.user };
      } else {
        return { name: "", email: "" };
      }
    } catch (e) {
      console.log(e);
    }
  }, [accessToken]);

  const setData = useCallback(
    async (data) => {
      return await request(`${URL}/auth/user`, data, "PATCH", accessToken);
    },
    [accessToken]
  );

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setEdit(true);
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEdit(true);
  };

  const changeProfile = async (e: FormEvent) => {
    e.preventDefault();
    setData({ name: name, email: email });
    setEdit(false);
  };

  const cancelChanges = async () => {
    try {
      const { name, email } = await getData();
      setName(name);
      setEmail(email);
    } catch (e) {
      console.log(e);
    }
    setEdit(false);
  };

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
    const fetchData = async () => {
      try {
        const { name, email } = await getData();
        setName(name);
        setEmail(email);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [getData]);

  return (
    <div className={styles.container + " pt-30"}>
      <div className={styles.flex}>
        <aside className={styles.aside + " pl-5 pr-15"}>
          <div className={styles.link + " text text_type_main-medium"}>
            <Link to="/profile">Профиль</Link>
          </div>
          <div className={styles.link + " text text_type_main-medium text_color_inactive"}>
            <Link to="/profile/orders">История заказов</Link>
          </div>
          <div onClick={handleSignOut} className={styles.link + " text text_type_main-medium text_color_inactive"}>
            <Link to="/login">Выход</Link>
          </div>
          <div className={styles.info + " pt-20 text text_type_main-default text_color_inactive"}>
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </aside>
        <div className={styles.inputs}>
          <form className={styles.inputs + " text_color_inactive"} onSubmit={changeProfile}>
            <Input name="name" value={name} placeholder="Имя" icon="EditIcon" onChange={changeName} />
            <div className={styles.inputs + " mt-6 mb-6 text_color_inactive"}>
              <Input name="email" value={email} placeholder="Логин" icon="EditIcon" onChange={changeEmail} />
            </div>
            <PasswordInput name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {edit && (
              <div className="pt-6 pb-2">
                <Button>Сохранить</Button>
              </div>
            )}
          </form>
          {edit && (
            <Button type="secondary" onClick={cancelChanges}>
              Отменить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
