import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BreadcrumbsData } from "../../../../../models/ui/BreadcrumbsData";
import { Breadcrumbs } from "@mui/material";
import { bind } from "react-rxjs";
import {
  primaryFilesViewPath$,
  secondaryFilesViewPath$,
  setPrimaryFilesViewPath,
  setSecondaryFilesViewPath,
} from "../../../../../services/DriveService";
import { FilesViewTypeEnum } from "../../../../../enums/FilesViewTypeEnum";
import { PathEnum } from "../../../../../enums/PathEnum";
import { FileData } from "../../../../../models/api/FileData";

interface DriveBreadcrumbsProps {
  viewType: FilesViewTypeEnum;
}

const [usePrimaryFilesViewPath] = bind(primaryFilesViewPath$);
const [useSecondaryFilesViewPath] = bind(secondaryFilesViewPath$);

const DriveBreadcrumbs = ({ viewType }: DriveBreadcrumbsProps) => {
  const primaryFilesViewPath = usePrimaryFilesViewPath();
  const secondaryFilesViewPath = useSecondaryFilesViewPath();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const previewPath =
      viewType === FilesViewTypeEnum.PRIMARY
        ? primaryFilesViewPath
        : secondaryFilesViewPath;

    if (!previewPath) return;

    const breadcrumbs: BreadcrumbsData[] = [];
    const currentPath: FileData[] = [];

    for (let folder of previewPath) {
      currentPath.push(folder);
      breadcrumbs.push({
        label: folder.filename.toUpperCase(),
        path: [...currentPath],
      });
    }

    setBreadcrumbs(breadcrumbs);
  }, [primaryFilesViewPath, secondaryFilesViewPath]);

  const handleChangeFilesViewPath = (updatedPath: FileData[]) => {
    if (viewType === FilesViewTypeEnum.PRIMARY) {
      if (!primaryFilesViewPath) return;
      setPrimaryFilesViewPath(updatedPath);
      navigate(
        "/" +
          [
            PathEnum.APP,
            PathEnum.DRIVE,
            PathEnum.HOME,
            ...updatedPath.slice(1).map((file) => file.filename),
          ].join("/")
      );
    } else {
      if (!secondaryFilesViewPath) return;
      setSecondaryFilesViewPath(updatedPath);
    }
  };

  return (
    <div className="app__drive__content__breadcrumbs">
      <Breadcrumbs>
        {breadcrumbs.map((breadcrumb, idx) => (
          <div
            key={idx}
            className={"app__drive__content__breadcrumb"}
            onClick={() => handleChangeFilesViewPath(breadcrumb.path)}
          >
            {breadcrumb.label === "/"
              ? PathEnum.HOME.toUpperCase()
              : breadcrumb.label}
          </div>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default DriveBreadcrumbs;
