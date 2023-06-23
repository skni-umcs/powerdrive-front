import React, { useState } from "react";
import { language$ } from "../../../services/LanguageService";
import { sendPasswordResetEmail } from "../../../services/AuthService";
import { finalize, take } from "rxjs";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";
import AccountRetrievalForm from "./components/AccountRetrievalForm";
import { AccountRetrievalData } from "../../../models/api/AccountRetrievalData";
import { bind } from "react-rxjs";

const [useLanguage] = bind(language$);

const AccountRetrieval = () => {
  const LANGUAGE = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRetrieval = (formData: AccountRetrievalData): void => {
    setIsLoading(true);
    sendPasswordResetEmail(formData.email)
      .pipe(
        take(1),
        finalize(() => setIsLoading(false))
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          navigate("/" + PathEnum.RETRIEVE_LINK_SENT);
        }

        // TODO: Handle error response
      });
  };

  return (
    <div className="app__auth__container">
      <div className="app__auth__card">
        <h2 className="app__auth__card__header">
          {LANGUAGE.AUTH.ACCOUNT_RETRIEVAL}
        </h2>
        <div className="app__auth__card__instruction">
          {LANGUAGE.AUTH.ACCOUNT_RETRIEVAL_INSTRUCTION}
        </div>
        <AccountRetrievalForm
          isLoading={isLoading}
          onSubmit={handleSubmitRetrieval}
        />
      </div>
    </div>
  );
};

export default AccountRetrieval;
