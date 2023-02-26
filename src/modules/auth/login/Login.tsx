import React, { useState } from "react";
import "../../../styles/auth.css";
import LoginForm from "./components/LoginForm";
import { LoginData } from "../../../models/api/LoginData";
import { Link, useNavigate } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";
import { language$ } from "../../../services/LanguageService";
import { login } from "../../../services/AuthService";
import { finalize, take } from "rxjs";
import { LoginErrorTypeEnum } from "../../../enums/LoginErrorTypeEnum";
import { bind } from "react-rxjs";
import { useCookies } from "react-cookie";

const [useLanguage] = bind(language$);

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<LoginErrorTypeEnum | null>(null);
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [_, setAuthCookie, removeAuthCookie] = useCookies(["user", "token"]);
  const LANGUAGE = useLanguage();
  const handleSubmitLogin = (formData: LoginData) => {
    setIsLoading(true);
    login(formData, setAuthCookie, removeAuthCookie)
      .pipe(
        take(1),
        finalize(() => setIsLoading(false))
      )
      .subscribe((loginRes) => {
        setLoginError(loginRes.error!);
        setAttemptCounter(attemptCounter + 1);
        if (loginRes.isSuccessful)
          navigate("/" + PathEnum.APP + "/" + PathEnum.DRIVE);
      });
  };

  return (
    <div className="app__auth__container">
      <div className="app__auth__card">
        <h2 className="app__auth__card__header">{LANGUAGE.AUTH.LOGIN_TITLE}</h2>
        <LoginForm
          onSubmit={handleSubmitLogin}
          isLoading={isLoading}
          error={loginError}
          attempts={attemptCounter}
        />
        <div className="app__auth__card__links">
          <Link
            className="app__auth__card__links__link"
            to={"/" + PathEnum.REGISTER}
          >
            {LANGUAGE.AUTH.REGISTER}
          </Link>
          <Link
            className="app__auth__card__links__link"
            to={"/" + PathEnum.ACCOUNT_RETRIEVAL}
          >
            {LANGUAGE.AUTH.RETRIEVE_ACCOUNT}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
