import React, { useEffect } from "react";
import DriveContent from "../common/driveContent/DriveContent";
import { useLocation, useNavigate } from "react-router-dom";
import { bind } from "react-rxjs";
import {
  directoryTree$,
  setPrimaryFilesViewPath,
  setSecondaryFilesViewPath,
} from "../../../../services/DriveService";
import { PathEnum } from "../../../../enums/PathEnum";
import { FileData } from "../../../../models/api/FileData";

const [udeDirectoryTree] = bind(directoryTree$);

const DriveHome = () => {
  const location = useLocation();
  const directoryTree = udeDirectoryTree();
  const navigate = useNavigate();

  useEffect(() => {
    if (!directoryTree) return;
    const locationDirectories = location.pathname.split("/").slice(4);
    let currentDirectory = directoryTree;
    const previewPath: FileData[] = [directoryTree];

    for (let directory of locationDirectories) {
      const dirIdx = directoryTree?.children?.findIndex(
        (child) => child.filename.toLowerCase() === directory.toLowerCase()
      );

      if (dirIdx !== undefined && dirIdx !== -1) {
        currentDirectory = currentDirectory?.children?.[dirIdx]!;
        previewPath.push(currentDirectory);
      } else {
        setPrimaryFilesViewPath(previewPath);
        setSecondaryFilesViewPath(previewPath);
        return navigate(
          "/" +
            [
              PathEnum.APP,
              PathEnum.DRIVE,
              PathEnum.HOME,
              ...previewPath.slice(1).map((file) => file.filename),
            ].join("/")
        );
      }
    }
    setPrimaryFilesViewPath(previewPath);
    setSecondaryFilesViewPath(previewPath);
  }, [directoryTree]);

  return (
    <React.Fragment>
      <DriveContent />
    </React.Fragment>
  );
};

export default DriveHome;
