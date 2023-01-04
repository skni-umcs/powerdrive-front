import React, { useState } from "react";
import { LANGUAGE } from "../../../services/LanguageService";
import PasswordResetForm from "./components/PasswordResetForm";
import { PasswordResetData } from "../../../models/api/PasswordResetData";
import { resetPassword } from "../../../services/AuthService";
import { finalize, take } from "rxjs";
import { PathEnum } from "../../../enums/PathEnum";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPasswordReset = (formData: PasswordResetData) => {
    setIsLoading(true);
    resetPassword(formData)
      .pipe(
        take(1),
        finalize(() => setIsLoading(false))
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          navigate("/" + PathEnum.LOGIN);
        } else {
          // TODO: Show error info
        }
      });
  };
  return (
    <div className="app__auth__container">
      <div className="app__auth__card">
        <h2 className="app__auth__card__header">
          {LANGUAGE.AUTH.RESET_PASSWORD}
        </h2>
        <PasswordResetForm
          onSubmit={handleSubmitPasswordReset}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PasswordReset;
