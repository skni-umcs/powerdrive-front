import React from "react";
import "../../../styles/auth.css";
import LoginForm from "./components/LoginForm";
import { LoginData } from "../../../models/api/LoginData";

const Login = () => {
  const handleSubmitLogin = (formData: LoginData) => {
    console.log(formData);
  };

  return (
    <div className="app__auth__container">
      <div className="app__auth__card">
        <h2 className="app__auth__card__header">Logowanie</h2>
        <LoginForm onSubmit={handleSubmitLogin} isLoading={false} />
      </div>
    </div>
  );
};

export default Login;
