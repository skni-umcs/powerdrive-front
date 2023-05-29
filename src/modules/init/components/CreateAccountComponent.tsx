import React from "react";
import { bind } from "react-rxjs";
import { language$ } from "../../../services/LanguageService";
import { PathEnum } from "../../../enums/PathEnum";
import { useNavigate } from "react-router-dom";

const [useLanguage] = bind(language$);

const CreateAccountComponent = () => {
  const LANGUAGE = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PathEnum.REGISTER);
  };

  return (
    <div className="app__init__component__container">
      <div className="app__init__component">
        <div className="app__init__component__section">
          <h2 className="app__init__component__section__subtitle">
            {LANGUAGE.INIT.CREATE_ACCOUNT_SLOGAN}
          </h2>
          <div className="app__init__component__section__description">
            {LANGUAGE.INIT.CREATE_ACCOUNT_DESCRIPTION}
          </div>
          <div
            className="app__init__component__section__btn"
            onClick={handleNavigate}
          >
            {LANGUAGE.INIT.CREATE_ACCOUNT}
          </div>
        </div>
        <div className="app__init__component__section--centered">
          <img
            src={require("../../../assets/images/community.png")}
            alt=""
            className="app__init__component__subimage"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountComponent;
