import React, { useState } from "react";
import styles from "./index.module.css";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, Redirect } from "react-router-dom";
import { finalResetPassword } from "../../../services/auth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const history = useHistory();

  const handlePassword = async (e) => {
    e.preventDefault();
    const result = await finalResetPassword(password, code);
    if (result.success) {
      history.push("/login");
    } else {
      console.log(result.message);
    }
  };
  if (!history?.location?.state?.from) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.flex}>
      <form className={styles.flex} onSubmit={handlePassword}>
        <div className="text text_type_main-medium pt-15">Восстановление пароля</div>
        <div className={styles.input + " pt-6 pb-6"}>
          <PasswordInput onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
        </div>
        <div className={styles.input + " pb-6"}>
          <Input
            onChange={(e) => setCode(e.target.value)}
            name="email"
            value={code}
            placeholder={"Введите код из письма"}
          />
        </div>
        <Button>Сохранить</Button>
      </form>
      <div className="pt-20 text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link className="pl-2" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
