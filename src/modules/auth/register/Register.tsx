import React, { useState } from "react";
import { language$ } from "../../../services/LanguageService";
import { Link, useNavigate } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";
import RegisterForm from "./components/RegisterForm";
import { RegisterErrorTypeEnum } from "../../../enums/RegisterErrorTypeEnum";
import { register } from "../../../services/AuthService";
import { finalize, take } from "rxjs";
import { RegisterData } from "../../../models/api/RegisterData";
import { bind } from "react-rxjs";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/lab";

const [useLanguage] = bind(language$);

const Register = () => {
  const LANGUAGE = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] =
    useState<RegisterErrorTypeEnum | null>(null);
  const [errorSnackOpen, setErrorSnackOpen] = useState(false);
  const [successSnackOpen, setSuccessSnackOpen] = useState(false);
  const [attemptCounter, setAttemptCounter] = useState(0);

  const handleSubmitRegister = (formData: RegisterData) => {
    setIsLoading(true);
    register(formData)
      .pipe(
        take(1),
        finalize(() => setIsLoading(false))
      )
      .subscribe((registerRes) => {
        setAttemptCounter(attemptCounter + 1);
        if (registerRes.isSuccessful) {
          setSuccessSnackOpen(true);
          navigate("/" + PathEnum.LOGIN);
        } else {
          setErrorSnackOpen(true);
        }
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
      <Snackbar
        open={errorSnackOpen}
        autoHideDuration={6000}
        onClose={() => setErrorSnackOpen(false)}
      >
        <Alert severity={"error"} onClose={() => setErrorSnackOpen(false)}>
          {LANGUAGE.AUTH.REGISTER_ATTEMPT_FAILED}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackOpen(false)}
      >
        <Alert severity={"success"} onClose={() => setSuccessSnackOpen(false)}>
          {LANGUAGE.AUTH.REGISTER_ATTEMPT_SUCCESS}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Register;
