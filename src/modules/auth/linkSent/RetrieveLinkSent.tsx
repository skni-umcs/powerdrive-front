import React from "react";
import { LANGUAGE } from "../../../services/LanguageService";

const RetrieveLinkSent = () => {
  return (
    <div className="app__auth__container">
      <div className="app__auth__card">
        <h2 className="app__auth__card__header">
          {LANGUAGE.AUTH.LINK_WAS_SENT}
        </h2>
        <div className="app__auth__card__instruction">
          {LANGUAGE.AUTH.LINK_WAS_SENT_INSTRUCTION}
        </div>
      </div>
    </div>
  );
};

export default RetrieveLinkSent;
