import React from "react";
import {bind} from "react-rxjs";
import {language$} from "../../../../../services/LanguageService";
import {selectedFiles$} from "../../../../../services/DriveService";

const [useLanguage] = bind(language$);
const [useSelectedFiles] = bind(selectedFiles$);

const SelectedFiles = () => {
    const LANGUAGE = useLanguage();
    const selectedFiles = useSelectedFiles();

    return <div className="app__drive__selected__container">
        <div className="app__drive__selected__text">
            {LANGUAGE.DRIVE.SELECTED_FILES}: {selectedFiles.length}
        </div>
        <div className="app__drive__selected__actions">

        </div>
    </div>
}

export default SelectedFiles;