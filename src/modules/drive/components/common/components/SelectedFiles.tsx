import React from "react";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../services/LanguageService";
import { selectedFiles$ } from "../../../../../services/DriveService";
import { Tooltip } from "@mui/material";

const [useLanguage] = bind(language$);
const [useSelectedFiles] = bind(selectedFiles$);

const SelectedFiles = () => {
  const LANGUAGE = useLanguage();
  const selectedFiles = useSelectedFiles();

  return (
    <div className="app__drive__selected__container">
      <div className="app__drive__selected__text">
        {LANGUAGE.DRIVE.SELECTED_FILES}: {selectedFiles.length}
      </div>
      <div className="app__drive__selected__actions">
        <Tooltip title={LANGUAGE.DRIVE.SHARE} placement="top">
          <div className="app__drive__selected__action"></div>
        </Tooltip>
      </div>
    </div>
  );
};

export default SelectedFiles;
