import React from "react";
import "../../styles/init.css";
import HeroComponent from "./components/HeroComponent";
import CreateAccountComponent from "./components/CreateAccountComponent";
import FunctionalitiesComponent from "./components/FunctionalitiesComponent";

const Init = () => {
  return (
    <div className="app__init__container">
      <HeroComponent />
      <CreateAccountComponent />
      <FunctionalitiesComponent />
    </div>
  );
};

export default Init;
