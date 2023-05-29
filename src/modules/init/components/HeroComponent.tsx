import React from "react";
import { bind } from "react-rxjs";
import { language$ } from "../../../services/LanguageService";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";

const [useLanguage] = bind(language$);

const HeroComponent = () => {
  const LANGUAGE = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PathEnum.REGISTER);
  };

  return (
    <div className="app__init__component__container">
      <div className="app__init__component">
        <div className="app__init__component__section--centered">
          <img
            src={require("../../../assets/images/drive-logo-big.png")}
            alt=""
            className="app__init__component__image"
          />
        </div>
        <div className="app__init__component__section">
          <h1 className="app__init__component__section__title">
            {LANGUAGE.INIT.SLOGAN}
          </h1>
          <div className="app__init__component__section__description">
            {LANGUAGE.INIT.DESCRIPTION}
          </div>
          <div
            className="app__init__component__section__join-btn"
            onClick={handleNavigate}
          >
            {LANGUAGE.INIT.JOIN}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
