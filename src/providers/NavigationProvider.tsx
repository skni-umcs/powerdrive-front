import React, { useEffect } from "react";
import { PropsBase } from "../models/api/PropsBase";
import { useNavigate } from "react-router-dom";
import { navigationStream$ } from "../services/NavigationService";

const NavigationProvider = ({ children }: PropsBase) => {
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = navigationStream$.subscribe((path) => {
      console.log("NavigationProvider: ", path);
      navigate(path);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default NavigationProvider;
