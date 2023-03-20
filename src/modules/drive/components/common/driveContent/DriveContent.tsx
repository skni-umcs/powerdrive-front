import React from "react";
import DriveHeader from "../driveHeader/DriveHeader";
import DriveFilesViewContainer from "./components/filesView/DriveFilesViewContainer";

const DriveContent = () => {
  return (
    <div className="app__drive__content">
      <DriveHeader />
      <DriveFilesViewContainer />
    </div>
  );
};

export default DriveContent;
