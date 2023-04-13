import React, { Component } from "react";
import "../../../styles/settings.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { bind } from "react-rxjs";
import { language$ } from "services/LanguageService";
import AccountSettingsForm from "./components/AccountSettingsForm";
import AccountPasswordResetForm from "./components/AccountPasswordResetForm";

const [useLanguage] = bind(language$);

const Settings = () => {
  const LANGUAGE = useLanguage();

  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values);
    // ... do something with the form values, such as sending them to a server
  };
  return (
    <div className="app__settings__main">
      <div className="app__settings__subsection app__settings__header">
        <div style={{ display: "flex", width: "100%" }}>
          <ArrowBackIcon sx={{ fontSize: "2rem" }} />
          <h1>{LANGUAGE.SETTINGS.SETTINGS}</h1>
        </div>
        <div style={{ display: "flex", paddingRight: "1rem" }}>
          <SaveIcon style={{ fontSize: "3rem" }} />
        </div>
      </div>

      <div className="app__settings__account__reset">
        {/*ACCOUNT SETTINGS*/}
        <div className="app__settings__subsection__half">
          <h2>{LANGUAGE.SETTINGS.ACCOUNT_SETTINGS}</h2>
          <AccountSettingsForm onSubmit={handleSubmit} />
        </div>
        <div className="app__settings__subsection__half">
          <h2>{LANGUAGE.SETTINGS.PASSWORD_RESET}</h2>
          <AccountPasswordResetForm onSubmit={handleSubmit} />
        </div>
      </div>

      <div className="app__settings__subsection">
        <h2>{LANGUAGE.SETTINGS.DRIVE_SETTINGS}</h2>
      </div>

      <div className="app__settings__subsection">
        <h2>{LANGUAGE.SETTINGS.CALENDAR_SETTINGS}</h2>
      </div>

      <div className="app__settings__subsection">
        <h2>{LANGUAGE.SETTINGS.NOTES_SETTINGS}</h2>
      </div>
    </div>
  );
};
export default Settings;
