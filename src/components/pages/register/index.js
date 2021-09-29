import React, { useState } from "react";
import styles from "./index.module.css";
import { Input, EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../../services/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(email, password, name);
    if (result.success) {
      history.push("/");
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className={styles.flex}>
      <form className={styles.flex} onSubmit={handleRegister}>
        <div className="text text_type_main-medium pt-15">Регистрация</div>
        <div className={styles.input + " pt-6"}>
          <Input value={name} placeholder="Имя" icon="EditIcon" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.input + " pt-6"}>
          <EmailInput onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
        </div>
        <div className={styles.input + " pt-6 pb-6"}>
          <PasswordInput onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
        </div>
        <Button>Зарегистрироваться</Button>
      </form>
      <div className="pt-10 text text_type_main-default text_color_inactive">
        Уже зарегистрированы?
        <Link className=" pl-2" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
