import React, { useState } from "react";
import styles from "./index.module.css";
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../../services/auth";
import { SIGN_IN } from "../../../services/actions";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn(email, password);
    if (result.success) {
      dispatch({ type: SIGN_IN });
      history.replace((history.location.state && history.location.state.from.pathname) || "/");
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className={styles.flex}>
      <form className={styles.flex} onSubmit={handleLogin}>
        <div className="text text_type_main-medium pt-15">Вход</div>
        <div className={styles.input + " pt-6"}>
          <EmailInput onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
        </div>
        <div className={styles.input + " pt-6 pb-6"}>
          <PasswordInput onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
        </div>
        <Button>Войти</Button>
      </form>
      <div className="pt-20 text text_type_main-default text_color_inactive">
        Вы - новый пользователь?
        <Link className=" pl-2" to="/register">
          Зарегистрироваться
        </Link>
      </div>
      <div className="pt-4 text text_type_main-default text_color_inactive">
        Забыли пароль?
        <Link className="pl-2" to="/forgot-password">
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default Login;
