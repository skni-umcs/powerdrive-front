import React from "react";
import "../../../styles/auth.css";
import LoginForm from "./components/LoginForm";
import { LoginData } from "../../../models/api/LoginData";
import { Link, useNavigate } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmitLogin = (formData: LoginData) => {
    console.log(formData);
    navigate("/" + PathEnum.DRIVE);
  };

  return (
    <div className="app__auth__container">
      <div className="app__auth__card">
        <h2 className="app__auth__card__header">Logowanie</h2>
        <LoginForm onSubmit={handleSubmitLogin} isLoading={false} />
        <div className="app__auth__card__links">
          <Link to={"/" + PathEnum.REGISTER}>Zarejestruj się</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
