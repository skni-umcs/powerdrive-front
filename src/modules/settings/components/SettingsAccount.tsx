import React from "react";
import { bind } from "react-rxjs";
import { language$ } from "../../../services/LanguageService";

const [useLanguage] = bind(language$);

const SettingsAccount = () => {
  const LANGUAGE = useLanguage();

  return (
    <div className="app__settings__container">
      <h3 className="app__settings__header">
        {LANGUAGE.SETTINGS.ACCOUNT.TITLE}
      </h3>
      <div className="app__settings__content">
        <div className="app__settings__card"></div>
        <div className="app__settings__card"></div>
        <div className="app__settings__card"></div>
        <div className="app__settings__card"></div>
      </div>
    </div>
  );
};

export default SettingsAccount;
