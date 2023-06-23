import React, { useState } from "react";
import { language$ } from "../../../services/LanguageService";
import { Link } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";
import RegisterForm from "./components/RegisterForm";
import { RegisterErrorTypeEnum } from "../../../enums/RegisterErrorTypeEnum";
import { register } from "../../../services/AuthService";
import { finalize, take } from "rxjs";
import { RegisterData } from "../../../models/api/RegisterData";
import { bind } from "react-rxjs";

const [useLanguage] = bind(language$);

const Register = () => {
  const LANGUAGE = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] =
    useState<RegisterErrorTypeEnum | null>(null);
  const [attemptCounter, setAttemptCounter] = useState(0);

  const handleSubmitRegister = (formData: RegisterData) => {
    setIsLoading(true);
    register(formData)
      .pipe(
        take(1),
        finalize(() => setIsLoading(false))
      )
      .subscribe((result) => {
        setAttemptCounter(attemptCounter + 1);
        // TODO: Handle register error response
      });
  };

  return (
    <React.Fragment>
      <div className="app__auth__container">
        <div className="app__auth__card">
          <h2 className="app__auth__card__header">
            {LANGUAGE.AUTH.REGISTER_TITLE}
          </h2>
          <RegisterForm
            onSubmit={handleSubmitRegister}
            isLoading={isLoading}
            error={registerError}
            attempts={attemptCounter}
          />
          <div className="app__auth__card__links">
            <Link
              className="app__auth__card__links__link"
              to={"/" + PathEnum.LOGIN}
            >
              {LANGUAGE.AUTH.LOGIN}
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
    </React.Fragment>
  );
};

export default Register;
