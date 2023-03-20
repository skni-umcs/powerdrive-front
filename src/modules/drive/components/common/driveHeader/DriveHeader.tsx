import React from "react";
import DriveActions from "./components/DriveActions";
import DriveBreadcrumbs from "../driveBreadcrumbs/DriveBreadcrumbs";
import SelectedFiles from "./components/SelectedFiles";
import { mobileView$ } from "../../../../../services/DimensionsService";
import { bind } from "react-rxjs";
import { FilesViewTypeEnum } from "../../../../../enums/FilesViewTypeEnum";
import { primaryFilesViewPath$ } from "../../../../../services/DriveService";
import { language$ } from "../../../../../services/LanguageService";

const [useLanguage] = bind(language$);
const [useMobileView] = bind(mobileView$);
const [usePrimaryFilesViewPath] = bind(primaryFilesViewPath$);

const DriveHeader = () => {
  const LANGUAGE = useLanguage();
  const mobileView = useMobileView();
  const primaryFilesViewPath = usePrimaryFilesViewPath();

  return (
    <React.Fragment>
      <DriveBreadcrumbs viewType={FilesViewTypeEnum.PRIMARY} />
      <div className="app__drive__content__header">
        <div className="app__drive__content__header__title">
          {primaryFilesViewPath && primaryFilesViewPath.length > 1
            ? primaryFilesViewPath[primaryFilesViewPath.length - 1].filename
            : LANGUAGE.DRIVE.YOUR_FILES}
        </div>
        <DriveActions />
      </div>
      {mobileView && <SelectedFiles />}
    </React.Fragment>
  );
};

export default DriveHeader;
