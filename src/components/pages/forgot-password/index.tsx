import React, { useState, FC } from "react";
import styles from "./index.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { resetPassword } from "../../../services/auth";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const history = useHistory();
  const location = useLocation();

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await resetPassword(email);
    if (result.success) {
      history.push({
        pathname: "/reset-password",
        state: {
          from: location.pathname,
        },
      });
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className={styles.flex}>
      <form className={styles.flex} onSubmit={handlePassword}>
        <div className="text text_type_main-medium pt-15">Восстановление пароля</div>
        <div className={styles.input + " pt-6 pb-6"}>
          <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} placeholder={"Укажите e-mail"} />
        </div>
        <Button>Восстановить</Button>
      </form>
      <div className="pt-20 text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link className=" pl-2" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
