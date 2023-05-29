import React from "react";
import { bind } from "react-rxjs";
import { language$ } from "../../../services/LanguageService";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";

const [useLanguage] = bind(language$);

const FunctionalitiesComponent = () => {
  const LANGUAGE = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = (path: PathEnum) => {
    navigate(`${PathEnum.APP}/${path}`);
  };

  return (
    <div className="app__init__component__container">
      <div className="app__init__component">
        <div className="app__init__component__section">
          <div
            className="app__init__function__card"
            onClick={(_) => handleNavigate(PathEnum.DRIVE)}
          >
            <img
              src={require("../../../assets/images/cloud-data.png")}
              alt=""
              className="app__init__function__card__image"
            />
            <div className="app__init__function__card__label">
              {LANGUAGE.INIT.FILES}
            </div>
          </div>
        </div>
        <div className="app__init__component__section">
          <div
            className="app__init__function__card"
            onClick={(_) => handleNavigate(PathEnum.CALENDAR)}
          >
            <img
              src={require("../../../assets/images/time-management.png")}
              alt=""
              className="app__init__function__card__image"
            />
            <div className="app__init__function__card__label">
              {LANGUAGE.INIT.EVENTS}
            </div>
          </div>
        </div>
        <div className="app__init__component__section">
          <div
            className="app__init__function__card"
            onClick={(_) => handleNavigate(PathEnum.NOTES)}
          >
            <img
              src={require("../../../assets/images/note-big.png")}
              alt=""
              className="app__init__function__card__image"
            />
            <div className="app__init__function__card__label">
              {LANGUAGE.INIT.NOTES}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionalitiesComponent;
