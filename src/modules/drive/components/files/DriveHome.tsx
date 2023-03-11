import React, {useEffect, useState} from "react";
import DriveContent from "../common/DriveContent";
import {useLocation} from "react-router-dom";
import {BreadcrumbsData} from "../../../../models/ui/BreadcrumbsData";
import {bind} from "react-rxjs";
import {language$} from "../../../../services/LanguageService";

const [useLanguage] = bind(language$);

const DriveHome = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsData[]>([]);
  const location = useLocation();
  const LANGUAGE = useLanguage();

  useEffect(() => {
    const folders = location.pathname.split("/").slice(3);
    const breadcrumbs: BreadcrumbsData[] = [];

    for (let i = 0; i < folders.length; i++) {
        breadcrumbs.push({
          label: folders[i].toUpperCase(),
          url: folders.slice(1, i + 1).join("/")
        });
    }

    setBreadcrumbs(breadcrumbs);
  }, [location]);

  return <React.Fragment>
    <DriveContent breadcrumbs={breadcrumbs} title={LANGUAGE.DRIVE.YOUR_FILES} />
  </React.Fragment>;
};

export default DriveHome;
